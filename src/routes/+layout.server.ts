export async function load({ locals, depends, cookies }) {
  depends("layout:root");

  const cart_id_cookie = cookies.get("pb_cart");

  const cart_items = locals.pb
    .collection("cart_items")
    .getFullList({
      filter: `cart = "${cart_id_cookie}"`
    });

  return {
    user: locals.user,
    cart_items_count: cart_items.then(items => items.length),
    seo: {
      title: "Главная"
    }
  }
}
