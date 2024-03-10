import { ORIGIN_BACKEND, ORIGIN_BACKEND_INTERNAL } from '$env/static/private';

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
          return locals.pb.files.getUrl(product, file_name).replace(ORIGIN_BACKEND_INTERNAL, ORIGIN_BACKEND);
        })
      }
    })
  }
}
