export async function load({ params, locals }) {
  const product = await locals.pb
    .collection('products')
    .getOne(params.slug);

  product.gallery = product.gallery.map((file_name: string) => {
    return locals.pb.files.getUrl(product, file_name);
  });

  const stock_items = await locals.pb
    .collection('stock_items')
    .getFullList({
      filter: `product = "${product.id}"`,
      expand: "size_group"
    });

  const sizes_details = await locals.pb
    .collection('sizes')
    .getFullList({
      filter: stock_items.map(({ expand }) => `group = "${expand!.size_group.id}"`).join(' || ')
    });

  return {
    product,
    stock_items,
    sizes_details,
    seo: {
      title: product.title
    }
  }
}
