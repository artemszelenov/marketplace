export async function load({ locals, params }) {
  const doc = await locals.pb
    .collection("docs")
    .getFirstListItem(`slug = "${params.slug}"`);

  return {
    title: doc.title,
    body: doc.body,
    seo: {
      title: doc.title
    }
  }
}
