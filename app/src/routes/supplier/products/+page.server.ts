export async function load({ locals }) {
  const products = await locals.pb
    .collection("products")
    .getFullList({
      filter: `supplier = "${locals.user?.id}"`,
    });

  const stock_items = await locals.pb
    .collection("stock_items")
    .getFullList({
      filter: products.map(({ id }) => `product = "${id}"`).join(" || "),
      sort: "count",
      expand: "size_group, product"
    });

  return {
    items: stock_items.map(item => {
      return {
        id: item.id,
        title: item.expand?.product.title,
        count: item.count,
        size: item.expand?.size_group.title,
        image: locals.pb_helpers.files.getFileUrlWithCorrectOrigin(item.expand?.product, item.expand?.product.gallery[0])
      }
    })
  }
}
