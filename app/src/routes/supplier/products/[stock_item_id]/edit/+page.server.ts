export async function load({ locals, params }) {
  const current_stock_item = await locals.pb
    .collection("stock_items")
    .getOne(params.stock_item_id, {
      expand: "product"
    });

  const current_color_id = current_stock_item.expand?.product.color;
  const current_stock_item_id = params.stock_item_id;
  const current_product_id = current_stock_item.expand?.product.id;

  const products = await locals.pb
    .collection("products")
    .getFullList({
      filter: `group = "${current_stock_item.expand?.product.group}"`,
      expand: "color"
    });

  for await (const product of products) {
    const all_stock_items = await locals.pb
      .collection("stock_items")
      .getFullList({
        filter: `product = "${product.id}"`,
        expand: "size_group"
      });

    product.stock_items = all_stock_items.map(item => {
      return {
        id: item.id,
        count: item.count,
        size_title: item.expand?.size_group.title
      }
    });
  }

  return {
    current_color_id,
    current_product_id,
    current_stock_item_id,
    products: products.map(product => {
      return {
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        color: {
          id: product.color,
          title: product.expand?.color.ru_title
        },
        gallery: product.gallery.map((file_name: string) => {
          return locals.pb_helpers.files.getFileUrlWithCorrectOrigin(product, file_name);
        }),
        stock_items: product.stock_items
      }
    })
  }
}
