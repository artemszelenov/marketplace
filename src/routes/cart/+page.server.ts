import { error, fail, redirect } from '@sveltejs/kit';
import type { CartItem } from "$lib/schema"
import { ClientResponseError } from "pocketbase";
import type { ClientResponseError as ClientResponseErrorType } from "pocketbase";

export async function load({ locals, url }) {
  try {
    let cart_items: CartItem[] = [];

    // TODO: rebuild to cart_item.expand.product

    const itemsIds = url.searchParams.get("items");

    if (itemsIds) {
      const stock_item_records = await locals.pb
        .collection('stock_items')
        .getFullList({
          filter: itemsIds
            .split(",")
            .map(id => `id = "${id}"`)
            .join(" || "),
          expand: "product, product.type, size_group"
        });

      const sizes_details_records = await locals.pb
        .collection('sizes')
        .getFullList({
          filter: stock_item_records.map(({ expand }) => `group = "${expand!.size_group.id}"`).join(' || '),
          expand: "metric, group"
        });

      cart_items = stock_item_records.map(stock_item => {
        const product = stock_item.expand!.product;

        return {
          product: {
            type: product.expand?.type.value ?? 'unknown_type',
            title: product.title,
            price: product.price,
            image: locals.pb.files.getUrl(product, product.gallery[0])
          },
          stock_item: {
            id: stock_item.id,
            product_id: stock_item.product,
            size_group_id: stock_item.size_group,
            count: stock_item.count,
            details: {}
          }
        }
      });

      // оптимизировать
      sizes_details_records.forEach(size_details => {
        stock_item_records.forEach(stock_item_record => {
          if (stock_item_record.size_group === size_details.expand?.group.id) {
            const cart_item = cart_items.find(cart_item => stock_item_record.id === cart_item.stock_item.id);
    
            if (!cart_item) return
    
            const group_id = size_details.expand!.group.id;
    
            cart_item.stock_item.details[group_id] = {
              ...(cart_item.stock_item.details[group_id] ?? {}),
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
      const error = err as ClientResponseErrorType;
      // if cart_item does not exsist yet in cart
      if (error instanceof ClientResponseError && error.status === 404) {
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
