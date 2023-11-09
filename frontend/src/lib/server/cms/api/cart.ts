import type { z } from "zod";
import type { Product as ProductDoc } from '../types';
import type { ProductResult, CartItemResult } from "$lib/schema";
export type Product = z.infer<typeof ProductResult>
type CartItem = z.infer<typeof CartItemResult>

import { BACKEND_URL } from "$env/static/private";
import { buildProduct } from '$lib/utils/products';

export async function getCartItems(query: typeof fetch, cartItemsIDs?: string | null): Promise<CartItem[]> {
  if (!cartItemsIDs) return [];

  const groupedCartItems = cartItemsIDs
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

  const res = await query(`${BACKEND_URL}/api/products?where[id][in]=${uniqueProductsIDs}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const json = await res.json();
  const products = json.docs as ProductDoc[];

  const productsData = products.map(buildProduct) ?? [];

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

  return items;
}
