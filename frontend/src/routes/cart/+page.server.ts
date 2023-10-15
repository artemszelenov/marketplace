import { getCartItems } from "$lib/server/cms/api/cart";

export async function load({ url }) {
  const ids = url.searchParams.get("items");

  if (ids) {
    const products = await getCartItems(ids);

    return {
      cartItems: products
    }
  }

  return {
    cartItems: []
  }
}
