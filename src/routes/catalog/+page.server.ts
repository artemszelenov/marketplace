export async function load({ locals }) {
  let teasers = await locals.pb
    .collection('product_teasers')
    .getFullList();

  teasers = teasers.map(teaser => {
    return {
     ...teaser,
      gallery: teaser.gallery.map((file_name: string) => {
        return locals.pb.files.getUrl(teaser, file_name);
      })
    }
  });

  return {
    teasers,
    seo: {
      title: "Каталог"
    }
  }
}
