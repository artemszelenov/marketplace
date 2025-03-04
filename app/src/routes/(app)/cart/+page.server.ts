import { error, fail } from '@sveltejs/kit';
import { StockItemsMetricsSchema, type CartItem } from "$lib/schema";
import { ClientResponseError } from "pocketbase";

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
        const firstImageUrl = locals.pb_helpers.files.getFileUrlWithCorrectOrigin(product, product.gallery[0]);

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
            color: product.expand?.color?.title,
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
      cart_items,
      cart_items_count: cart_items.length,
      seo: {
        title: "Cart"
      }
    }
  } catch (err) {
    console.log(`Server error`, err);
		throw error(500, {
			message: 'Server error'
		});
  }
}

export const actions = {
  add: async ({ request, cookies, locals }) => {
    const body = Object.fromEntries(await request.formData());

    const stock_item_id = body['stock-item']?.toString();
    const cart_id_cookie = cookies.get("pb_cart") ?? '';

    if (!stock_item_id) {
      console.log('stock-item not provided');
      throw error(400, {
        message: 'stock-item not provided'
      });
    }

    // new cart flow
    let existing_cart_record;

    try {
      existing_cart_record = await locals.pb
        .collection("carts")
        .getFirstListItem(`id = "${cart_id_cookie}"`); // throw if not found
    } catch (err) {
      const new_cart = await locals.pb
        .collection("carts")
        .create({
          user: locals.user?.id,
        });

      await locals.pb
        .collection("cart_items")
        .create({
          stock_item: stock_item_id,
          quantity: Number(body.quantity),
          cart: new_cart.id
        });

      cookies.set("pb_cart", new_cart.id, { path: "/" });

      return {
        message: 'The product has been added to the cart'
      }
    }

    // existing cart flow
    let cart_item_record;

    try {
      cart_item_record = await locals.pb
        .collection("cart_items")
        .getFirstListItem(`stock_item = "${stock_item_id}" && cart = "${existing_cart_record.id}"`, {
          expand: "stock_item"
        }); // throw if not found
    } catch (err) {
      await locals.pb
        .collection("cart_items")
        .create({
          stock_item: stock_item_id,
          quantity: Number(body.quantity),
          cart: existing_cart_record.id
        });

      return {
        message: 'The product has been added to the cart'
      }
    }

    // item in stock
    if (cart_item_record.quantity < cart_item_record.expand?.stock_item.count) {
      await locals.pb
        .collection("cart_items")
        .update(cart_item_record.id, {
          quantity: cart_item_record.quantity + 1
        });

      return {
        message: `Successfully. Quantity in cart: ${cart_item_record.quantity + 1}`
      }
    }

    return fail(422, { message: "There is not enough product in stock" });
  },

  remove: async ({ request, locals, cookies }) => {
    const body = Object.fromEntries(await request.formData());

    const cart_item_id = body['cart-item']?.toString();
    const cart_id_cookie = cookies.get("pb_cart") ?? '';

    if (!cart_item_id) {
      console.log('cart-item is not provided');
      throw error(400, {
        message: 'cart-item is not provided'
      });
    }

    try {
      await locals.pb
        .collection('cart_items')
        .delete(cart_item_id);

      // delete cart if the last cart_item deleted
      const cart_items_records = await locals.pb
        .collection("cart_items")
        .getFullList({
          filter: `cart = "${cart_id_cookie}"`
        });

      if (cart_items_records.length === 0) {
        await locals.pb
          .collection("carts")
          .delete(cart_id_cookie);

        cookies.delete("pb_cart", { path: "/" });
      }

      return {
        message: "The product has been removed from the cart"
      }
    } catch (err) {
      if (err instanceof ClientResponseError) {
        console.log('Pocketbase: ', err);
        throw error(500, {
          message: '[Pocketbase]: ' + err.message
        });
      }
      throw error(500);
    }
  }
}
