import type { Product, StockItem } from "$lib/schema"

export async function load({ params, locals }) {
  const product_record = await locals.pb
    .collection('products')
    .getOne(params.slug, {
      expand: "type"
    });

  const stock_item_records = await locals.pb
    .collection('stock_items')
    .getFullList({
      filter: `product = "${product_record.id}"`,
      expand: "size_group"
    });

  const sizes_details_records = await locals.pb
    .collection('sizes')
    .getFullList({
      filter: stock_item_records.map(({ expand }) => `group = "${expand!.size_group.id}"`).join(' || '),
      expand: "metric, group"
    });

  const product: Product = {
    id: product_record.id,
    type: product_record.expand?.type.value ?? 'unknown',
    price: product_record.price,
    title: product_record.title,
    description: product_record.description,
    gallery: product_record.gallery.map((file_name: string) => {
      return locals.pb.files.getUrl(product_record, file_name);
    })
  }

  const stock_items: StockItem[] = stock_item_records.map(item => {
    return {
      id: item.id,
      product_id: item.product,
      size_group_id: item.size_group,
      count: item.count,
      details: {}
    }
  });

  sizes_details_records.forEach(size_details => {
    stock_item_records.forEach(stock_item_record => {
      if (stock_item_record.size_group === size_details.expand?.group.id) {
        const stock_item = stock_items.find(({ id }) => stock_item_record.id === id);

        if (!stock_item) return

        stock_item.details[size_details.expand?.group.id] = {
          ...(stock_item.details[size_details.expand?.group.id] ?? {}),
          [size_details.expand?.metric.value ?? "unknown_metric"]: {
            title: size_details.title
          }
        }
      }
    });
  });

  return {
    product,
    stock_items,
    seo: {
      title: product.title
    }
  }
}
