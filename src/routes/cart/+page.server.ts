import type { Order } from "$lib/schema";
import { getCartItems } from "$lib/server/cms/api/cart";
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
  proceedOrder: async ({ request, locals, fetch }) => {
    const data = await request.formData();
    const orderData = data.get("order") as string;
    const order = JSON.parse(orderData) as Order;
   
    cms.proceedOrder(fetch, { order, user: locals.user! });
  }
}
