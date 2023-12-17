import { error, fail, redirect } from '@sveltejs/kit';
import { ClientResponseError } from "pocketbase";
import type { CartItem } from "$lib/schema";

export async function load({ locals, cookies }) {
  try {
    let cart_items: CartItem[] = [];

    const cart_id = cookies.get("pb_cart");

    if (cart_id) {
      const cart_items_records = await locals.pb
        .collection("cart_items")
        .getFullList({
          filter: `cart = "${cart_id}"`,
          expand: "stock_item, stock_item.product, stock_item.size_group"
        });

      const sizes_details_records = await locals.pb
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
          product: {
            id: product.id,
            type: product.expand?.type.value,
            title: product.title,
            price: product.price,
            description: '',
            gallery: [firstImageUrl],
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

      // оптимизировать
      sizes_details_records.forEach(size_details => {
        cart_items_records.forEach(cart_item_record => {
          const stock_item_record = cart_item_record.expand?.stock_item;

          if (stock_item_record.size_group === size_details.expand?.group.id) {
            const cart_item = cart_items.find(cart_item => stock_item_record.id === cart_item.stock_item.id);
    
            if (!cart_item) return
    
            const group_id = size_details.expand!.group.id;
    
            cart_item.stock_item.metrics[group_id] = {
              ...(cart_item.stock_item.metrics[group_id] ?? {}),
              [size_details.expand?.metric?.value ?? "unknown_metric"]: {
                title: size_details.title
              }
            }
          }
        });
      });
    }

    return {
      cart_items,
      seo: {
        title: "Корзина"
      }
    }
  } catch (err) {
    console.log(`Ошибка на сервере`);
		throw error(500, {
			message: 'Ошибка на сервере'
		});
  }
}

export const actions = {
  add: async ({ request, cookies, locals }) => {
    const body = Object.fromEntries(await request.formData());

    const cart_id = cookies.get("pb_cart");

    // create new card if does not exsist with first cart_item
    if (!cart_id) {
      const new_cart = await locals.pb
        .collection("carts")
        .create({
          user: locals.user?.id,
        });

      await locals.pb
        .collection("cart_items")
        .create({
          stock_item: body["stock-item"],
          quantity: Number(body.quantity),
          cart: new_cart.id
        });

      cookies.set("pb_cart", new_cart.id, { path: "/" });

      return {
        success: true
      }
    }

    try {
      // if cart_item already exsists in cart
      const cart_item = await locals.pb
        .collection("cart_items")
        .getFirstListItem(`stock_item = "${body['stock-item']}" && cart = "${cart_id}"`, {
          expand: "stock_item"
        });

      if (cart_item.quantity + 1 >= cart_item.expand?.stock_item.count) {
        return fail(422, { errors: ["На складе недостаточно товара"] });
      } else {
        await locals.pb
          .collection("cart_items")
          .update(cart_item.id, {
            quantity: cart_item.quantity + 1
          });
      }
    } catch (err) {
      // if cart_item does not exsist in cart yet
      if (err instanceof ClientResponseError && err.status === 404) {
        await locals.pb
          .collection("cart_items")
          .create({
            stock_item: body["stock-item"],
            quantity: Number(body.quantity),
            cart: cart_id
          });
      }
    }

    throw redirect(303, body?.from?.toString() ?? "/");    
  }
}
