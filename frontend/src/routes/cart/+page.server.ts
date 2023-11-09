import type { z } from "zod";
import type { CartItemResult } from "$lib/schema";
type CartItem = z.infer<typeof CartItemResult>

type CartData = {
  cartItems: CartItem[],
  seo: {
    title: string
  }
}

import { getCartItems } from "$lib/server/cms/api/cart";

export async function load({ url, fetch }) {
  const cartItems = url.searchParams.get("items");

  const data: CartData = {
    cartItems: [],
    seo: {
      title: "Корзина"
    }
  }

  if (cartItems) {
    const groupedCartItems = cartItems
      .split(',')
      .reduce((acc, item) => {
        const [productID, sizeID] = item.split(':');

        if (acc[productID]) {
          acc[productID].push(sizeID);
        } else {
          acc[productID] = [sizeID];
        }

        return acc;
      }, {} as { [key: string]: string[] });

    const uniqueProductsIDs = Object.keys(groupedCartItems).join(',');
  
    const productsData = await getCartItems(fetch, uniqueProductsIDs);

    const items: CartItem[] = [];

    Object.keys(groupedCartItems).forEach(productID => {
      const sizes = groupedCartItems[productID];
      const product = productsData.find(p => p.id === productID);

      if (!product) return

      sizes.forEach(sizeID => {
        const size = product.sizes.find(s => s.value.id === sizeID);
        if (size) {
          items.push({ product, size, id: `${product.id}:${sizeID}` });
        }
      });
    });

    data.cartItems = items;
  }

  return data;
}
