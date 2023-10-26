import type { Product } from "$lib/server/cms/api/cart";
import { getCartItems } from "$lib/server/cms/api/cart";

type CartData = {
  cartItems: Product[],
  seo: {
    title: string
  }
}

export async function load({ url, fetch }) {
  const ids = url.searchParams.get("items");

  const data: CartData = {
    cartItems: [],
    seo: {
      title: "Корзина"
    }
  }

  if (ids) {
    const products = await getCartItems(fetch, ids);

    data.cartItems = products;
  }

  return data;
}
