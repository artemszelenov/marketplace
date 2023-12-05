import type PocketBase from "pocketbase";
import type { Product, StockItem } from "$lib/schema"

export async function load({ params, locals, url }) {
  const {
    product_record,
    stock_item_records,
    sizes_details_records,
    product_variants_records
  } = await getRecords(locals.pb, params.slug);

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

        const group_id = size_details.expand?.group.id;

        stock_item.details[group_id] = {
          ...(stock_item.details[group_id] ?? {}),
          [size_details.expand?.metric?.value ?? "unknown_metric"]: {
            title: size_details.title
          }
        }
      }
    });
  });

  const product_variants = product_variants_records.map(variant => {
    return {
      id: variant.id,
      title: variant.title,
      image: locals.pb.files.getUrl(variant, variant.gallery[0])
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
      expand: "type"
    });

  const stock_item_records = await pb
    .collection('stock_items')
    .getFullList({
      filter: `product = "${product_record.id}"`,
      expand: "size_group"
    });

  const sizes_details_records = await pb
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
    sizes_details_records,
    product_variants_records
  }
}
