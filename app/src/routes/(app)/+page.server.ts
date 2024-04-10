export async function load({ locals }) {
  const { items: new_items } = await locals.pb
    .collection('product_teasers')
    .getList(1, 10, {
      sort: "-created"
    })

  const { items: men_items } = await locals.pb
    .collection('product_teasers_men')
    .getList(1, 10, {
      sort: "-created"
    })

  const { items: women_items } = await locals.pb
    .collection('product_teasers_women')
    .getList(1, 10, {
      sort: "-created"
    })

  return {
    new_teasers: new_items.map(product => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        gallery: product.gallery.map((file_name: string) => {
          return locals.pb_helpers.files.getFileUrlWithCorrectOrigin(product, file_name)
        })
      }
    }),
    teasers_men: men_items.map(product => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        gallery: product.gallery.map((file_name: string) => {
          return locals.pb_helpers.files.getFileUrlWithCorrectOrigin(product, file_name)
        })
      }
    }),
    teasers_women: women_items.map(product => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        gallery: product.gallery.map((file_name: string) => {
          return locals.pb_helpers.files.getFileUrlWithCorrectOrigin(product, file_name)
        })
      }
    })
  }
}
