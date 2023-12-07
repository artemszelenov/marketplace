export async function load({ locals, depends, cookies }) {
  // depends("app:root-layout");

  const cart_id = cookies.get("pb_cart");

  const cart_items = locals.pb
    .collection("cart_items")
    .getFullList({
      filter: `cart = "${cart_id}"`
    });

  return {
    user: locals.user,
    cart_items_count: cart_items.then(items => items.length),
    seo: {
      title: "Главная"
    }
  }
}
