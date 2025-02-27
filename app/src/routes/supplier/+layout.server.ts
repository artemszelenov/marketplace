export async function load({ locals, depends }) {
  depends("supplier:root");

  return {
    user: locals.user,
    seo: {
      title: "Supplier dashboard"
    }
  }
}
