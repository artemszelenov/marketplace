import { TELEGRAM_BOT_TOKEN, TELEGRAM_ORDERS_CHAT_ID } from "$env/static/private";
import { error, fail, redirect } from "@sveltejs/kit";
import { StockItemsMetricsSchema, type CartItem } from "$lib/schema";

export async function load({ locals, cookies }) {
  await locals.pb.autoCancellation(false); // костыль, возможно надо убрать и оптимизировать

  try {
    let cart_items: CartItem[] = [];

    const cart_id = cookies.get("pb_cart");

    if (cart_id) {
      const cart_items_records = await locals.pb
        .collection("cart_items")
        .getFullList({
          filter: `cart = "${cart_id}"`,
          expand: "stock_item, stock_item.product, stock_item.size_group, stock_item.product.type, stock_item.product.color"
        });

      const sizes_records = await locals.pb
        .collection("sizes")
        .getFullList({
          filter: cart_items_records
            .map(cart_item => `group = "${cart_item.expand?.stock_item.expand?.size_group.id}"`)
            .join(' || '),
          expand: "metric, group"
        });

      cart_items = cart_items_records.map(cart_item => {
        const stock_item = cart_item.expand?.stock_item;
        const product = stock_item.expand?.product;
        const firstImageUrl = locals.pb.files.getUrl(product, product.gallery[0]);

        return {
          id: cart_item.id,
          quantity: cart_item.quantity,
          product: {
            id: product.id,
            type: product.expand?.type.value,
            title: product.title,
            price: product.price,
            description: '',
            gallery: [firstImageUrl],
            color: product.expand?.color?.ru_title,
            image: firstImageUrl
          },
          stock_item: {
            id: stock_item.id,
            product_id: product.id,
            count: stock_item.count,
            metrics: {}
          }
        }
      });

      for (const size_record of sizes_records) {
        for (const cart_item_record of cart_items_records) {
          const stock_item_record = cart_item_record.expand?.stock_item;

          if (stock_item_record.size_group === size_record.expand?.group.id) {
            const cart_item = cart_items.find(cart_item => stock_item_record.id === cart_item.stock_item.id);
            const metric_value = StockItemsMetricsSchema.parse(size_record.expand?.metric.value);

            if (cart_item) {
              cart_item.stock_item.metrics[metric_value] = size_record.title;
            }
          }
        }
      }
    }

    return {
      order_items: cart_items,
      cart_items_count: cart_items.length
    }
  } catch (err) {
    console.log(`Ошибка на сервере`, err);
		throw error(500, {
			message: 'Ошибка на сервере'
		});
  }
}

export const actions = {
  proceed: async ({ request, locals, cookies, fetch }) => {
    const body = Object.fromEntries(await request.formData()) as { [key: string]: string };

    const full_name = body.fullname
      .trim()
      .split(' ')
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join(' ');
    const phone = body.phone.trim();
    const email = body.email.trim();
    const social_network = body["social-network"].trim();
    const nickname = body.nickname.trim();
    const delivery_address = body["delivery-address"].trim();
    const delivery_city = body["delivery-city"].trim();

    await locals.pb.autoCancellation(false); // костыль, возможно надо убрать и оптимизировать

    let user;

    try {
      user = await locals.pb
        .collection("guests")
        .getFirstListItem(`email = "${email}"`);

      locals.pb
        .collection("guests")
        .update(user.id, { full_name, phone, social_network, nickname });
    } catch (err) {
      user = await locals.pb
        .collection("guests")
        .create({ full_name, email, phone, social_network, nickname });
    }

    const cart_items_records = await locals.pb
      .collection("cart_items")
      .getFullList({
        filter: `cart = "${cookies.get("pb_cart")}"`,
        expand: "stock_item, stock_item.size_group, stock_item.product, stock_item.product.color"
      });

    for (const cart_item of cart_items_records) {
      const stock_item = cart_item.expand?.stock_item;

      if (stock_item.count - cart_item.quantity < 0) {
        return fail(422, { message: "На складе недостаточно товара" });
      }
    }

    const new_order = await locals.pb
      .collection("orders")
      .create({
        paid_by: user.id,
        state: "intake",
        paid_total: Number(body.paid_total),
        paid_delivery: Number(body.paid_delivery)
      });

    let items_string = "";

    for (const cart_item of cart_items_records) {
      const stock_item = cart_item.expand?.stock_item;
      const product = stock_item.expand?.product;
      const leftover = stock_item.count - cart_item.quantity;

      items_string += `%0A%0A${product.title}%0AРазмер: ${stock_item.expand?.size_group.title}%0AЦвет: ${product.expand?.color.ru_title}%0AКоличество: ${cart_item.quantity}%0A-------------%0AОстаток: ${leftover}`;

      locals.pb
        .collection("order_items")
        .create({
          order: new_order.id,
          stock_item: cart_item.stock_item,
          quantity: cart_item.quantity,
          price: product.price
        });

      locals.pb
        .collection("stock_items")
        .update(stock_item.id, {
          count: leftover
        });

      locals.pb
        .collection("cart_items")
        .delete(cart_item.id);
    }

    if (cookies.get("pb_cart")) {
      await locals.pb
        .collection("carts")
        .delete(cookies.get("pb_cart")!);
    }

    cookies.delete("pb_cart", { path: "/" });

    const botMessage = `📝 *Новый заказ*%0A%0A*Получатель*%0A%0AФИО: ${full_name}%0AТелефон: ${phone}%0AПочта: ${email}%0AСоцсеть ${social_network} - @${nickname}%0A%0A*Доставка*%0A%0AГород: ${delivery_city}%0AАдрес ПВЗ: ${delivery_address}%0A%0A*Заказ*${items_string}`;

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_ORDERS_CHAT_ID}&text=${botMessage}&parse_mode=markdown`;
    await fetch(url);

    redirect(303, "/thank_you");

    // нужно удалить данные из localStorage после успешного чекаута ?
  }
}
