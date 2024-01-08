import cities from "$lib/data/cities.json";

export async function load() {
  return {
    cities,
    seo: {
      title: "Оформление заказа"
    }
  }
}
