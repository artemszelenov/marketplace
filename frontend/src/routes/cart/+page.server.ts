import { getCartItems } from "$lib/server/cms/api/cart";

export async function load({ url }) {
  const ids = url.searchParams.get("items");

  const data = {
    cartItems: [],
    seo: {
      title: "Корзина"
    }
  }

  if (ids) {
    const products = await getCartItems(ids);

    data.cartItems = products
  }

  return data;
}
