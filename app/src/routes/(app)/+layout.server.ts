export async function load({ locals, depends, cookies }) {
  depends("layout:root");

  const cart_id_cookie = cookies.get("pb_cart");

  let cart_items_count = 0;
  try {
    const cart_items = await locals.pb
      .collection("cart_items")
      .getFullList({
        filter: `cart = "${cart_id_cookie}"`
      });

    cart_items_count = cart_items.length;
  } catch (_) {}

  return {
    user: locals.user,
    cart_items_count,
    seo: {
      title: "Главная"
    }
  }
}
