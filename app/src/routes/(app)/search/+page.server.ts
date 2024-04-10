import { redirect } from '@sveltejs/kit'

export async function load({ locals, url }) {
  const query = url.searchParams.get("q")

  if (!query) {
    return redirect(303, '/catalog')
  }

  const teasers = await locals.pb
    .collection('product_teasers')
    .getFullList({
      filter: `title ~ "${query}"`
    })

  return {
    initial_query: query,
    teasers: teasers.map(product => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        gallery: product.gallery.map((file_name: string) => {
          return locals.pb_helpers.files.getFileUrlWithCorrectOrigin(product, file_name)
        })
      }
    }),
  }
}
