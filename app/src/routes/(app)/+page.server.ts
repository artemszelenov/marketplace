export async function load({ locals }) {
  const { items } = await locals.pb
    .collection('products')
    .getList(1, 10, {
      sort: "-created"
    });

  return {
    new_teasers: items.map(product => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        gallery: product.gallery.map((file_name: string) => {
          return locals.pb_helpers.files.getFileUrlWithCorrectOrigin(product, file_name);
        })
      }
    })
  }
}
