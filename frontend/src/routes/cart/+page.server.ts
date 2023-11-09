import { getCartItems } from "$lib/server/cms/api/cart";
import { fail, redirect } from "@sveltejs/kit";
import * as cms from "$lib/server/cms/api/order";

export async function load({ url, fetch }) {
  const cartItemsIDs = url.searchParams.get("items");

  return {
    cartItems: getCartItems(fetch, cartItemsIDs),
    seo: {
      title: "Корзина"
    }
  };
}

export const actions = {
  proceedOrder: async ({ request, cookies, locals, fetch }) => {
    const data = await request.formData();
    const currentCartInputData = data.get("current-cart") as string;
    const currentCart = JSON.parse(currentCartInputData) as Array<{ id: string, q: number }>;
    // cms.proceedOrder(fetch)
  }
}
