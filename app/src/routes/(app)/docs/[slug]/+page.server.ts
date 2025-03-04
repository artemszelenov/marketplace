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

// export function entries() {
// 	return [
// 		{ slug: 'privacy-policy' }
// 	];
// }

// export const prerender = true;
