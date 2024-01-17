import { error } from '@sveltejs/kit';
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
  proceed: async ({ request }) => {
    const body = Object.fromEntries(await request.formData());

    // нужно удалить данные из localStorage после успешного чекаута

    console.log(body);
  }
}
