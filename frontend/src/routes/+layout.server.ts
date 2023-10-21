export async function load({ locals }) {
  return {
    user: locals.user,
    seo: {
      title: "Главная"
    }
  }
}
