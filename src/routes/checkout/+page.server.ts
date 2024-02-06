import { error, fail, redirect } from '@sveltejs/kit';
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
  proceed: async ({ request, locals, cookies }) => {
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

    const test_body = {
      citycode: '44', // надо ли ?
      tk: 'cdek', // надо ли ?
      delivery_type: 'pickup', // надо ли ?
      delivery_point: '406a52a9-a394-449e-ba6d-22f6b9b90dec', // надо ли ?
      fullname: 'asdasdasd dsd asd',
      phone: '79507834198',
      email: 'deeloyy@gmail.com',
      'social-network': 'wa',
      nickname: 'artem123',
      agree: 'yes',
      paid_delivery: '486',
      paid_total: '40486'
    }

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
        expand: "stock_item, stock_item.product"
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

    for (const cart_item of cart_items_records) {
      const stock_item = cart_item.expand?.stock_item;
      const product = stock_item.expand?.product;

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
          count: stock_item.count - cart_item.quantity
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

    redirect(303, "/thank_you");

    // action to tg bot

    // нужно удалить данные из localStorage после успешного чекаута ?
  }
}
