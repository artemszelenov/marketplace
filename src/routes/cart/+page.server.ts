import { error } from '@sveltejs/kit';
import type { CartItem, Product } from "$lib/schema"

export async function load({ locals, url }) {
  try {
    let cart_items: CartItem[] = [];

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
          id: stock_item.id,
          type: product.expand?.type.value ?? 'unknown_type',
          title: product.title,
          price: product.price,
          image: locals.pb.files.getUrl(product, product.gallery[0]),
          stock_item: {
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
            const cart_item = cart_items.find(({ id }) => stock_item_record.id === id);
    
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
  proceedOrder: async ({ request, locals, fetch }) => {
    const data = await request.formData();
    const orderData = data.get("order") as string;
    const order = JSON.parse(orderData);
  }
}
