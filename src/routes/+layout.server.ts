export async function load({ locals, depends }) {
  depends("app:root-layout");

  return {
    user: locals.user,
    seo: {
      title: "Главная"
    }
  }
}
