import { ORIGIN_BACKEND_INTERNAL, ORIGIN_BACKEND } from '$env/static/private';
import { StockItemsMetricsSchema } from "$lib/schema"
import type PocketBase from "pocketbase";
import type { Product, StockItem } from "$lib/schema"

export async function load({ params, locals, url }) {
  const {
    product_record,
    stock_item_records,
    sizes_records,
    product_variants_records
  } = await getRecords(locals.pb, params.slug);

  const product: Product = {
    id: product_record.id,
    type: product_record.expand?.type.value ?? 'unknown',
    price: product_record.price,
    title: product_record.title,
    color: product_record.expand?.color.ru_title,
    description: product_record.description,
    gallery: product_record.gallery.map((file_name: string) => {
      return locals.pb.files.getUrl(product_record, file_name).replace(ORIGIN_BACKEND_INTERNAL, ORIGIN_BACKEND);
    }),
    image: locals.pb.files.getUrl(product_record, product_record.gallery[0]).replace(ORIGIN_BACKEND_INTERNAL, ORIGIN_BACKEND)
  }

  const stock_items: StockItem[] = stock_item_records.map(item => {
    return {
      id: item.id,
      product_id: item.product,
      count: item.count,
      metrics: {}
    }
  });

  for (const size_record of sizes_records) {
    for (const stock_item_record of stock_item_records) {
      if (stock_item_record.size_group === size_record.expand?.group.id) {
        const stock_item = stock_items.find(stock_item => stock_item_record.id === stock_item.id);
        const metric_value = StockItemsMetricsSchema.parse(size_record.expand?.metric.value);

        if (stock_item) {
          stock_item.metrics[metric_value] = size_record.title;
        }
      }
    }
  }

  const product_variants = product_variants_records.map(variant => {
    return {
      id: variant.id,
      title: variant.title,
      image: locals.pb.files.getUrl(variant, variant.gallery[0]).replace(ORIGIN_BACKEND_INTERNAL, ORIGIN_BACKEND)
    }
  });

  return {
    product,
    stock_items,
    current_stock_item_id: url.searchParams.get('stock_item'),
    product_variants,
    seo: {
      title: product.title
    }
  }
}

async function getRecords(pb: PocketBase, product_slug: string) {
  const product_record = await pb
    .collection('products')
    .getOne(product_slug, {
      expand: "type, color"
    });

  const stock_item_records = await pb
    .collection('stock_items')
    .getFullList({
      filter: `product = "${product_record.id}"`,
      expand: "size_group"
    });

  const sizes_records = await pb
    .collection('sizes')
    .getFullList({
      filter: stock_item_records.map(({ expand }) => `group = "${expand!.size_group.id}"`).join(' || '),
      expand: "metric, group"
    });
  
  const product_variants_records = await pb
    .collection('products')
    .getFullList({
      filter: `group = "${product_record.group}" && id != "${product_record.id}" && visible = true`
    });

  return {
    product_record,
    stock_item_records,
    sizes_records,
    product_variants_records
  }
}
