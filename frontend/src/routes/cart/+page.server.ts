import type { Product } from "$lib/server/cms/api/cart";
import { getCartItems } from "$lib/server/cms/api/cart";

type CartData = {
  cartItems: Product[],
  seo: {
    title: string
  }
}

export async function load({ url, fetch }) {
  const cartItems = url.searchParams.get("items");

  const data: CartData = {
    cartItems: [],
    seo: {
      title: "Корзина"
    }
  }

  if (cartItems) {
    const groupedCartItems = cartItems.split(',').reduce((acc, item) => {
      const [productID, sizeID] = item.split(':');

      if (acc[productID]) {
        acc[productID].push(sizeID);
      } else {
        acc[productID] = [sizeID];
      }

      return acc;
    }, {});

    const uniqueProductsIDs = Object.keys(groupedCartItems).join(',');
  
    const productsData = await getCartItems(fetch, uniqueProductsIDs);

    const items = [];

    Object.keys(groupedCartItems).forEach(productID => {
      const sizes = groupedCartItems[productID];
      const product = productsData.find(p => p.id === productID);

      sizes.forEach(sizeID => {
        const size = product.sizes.find(s => s.value.id === sizeID);
        items.push({ ...product, size, cartItemToken: `${product.id}:${sizeID}` });
      });
    });

    data.cartItems = items;
  }

  return data;
}
