export async function load({ locals }) {
  const teasers = await locals.pb
    .collection('product_teasers')
    .getFullList();

  return {
    teasers,
    seo: {
      title: "Каталог"
    }
  }
}
