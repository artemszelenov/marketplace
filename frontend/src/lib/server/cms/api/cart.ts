import type { z } from "zod";
import type { Product as ProductDoc } from '../types';
import type { ProductResult } from "$lib/schema";
type Product = z.infer<typeof ProductResult>

import { BACKEND_URL } from "$env/static/private";
import { buildProduct } from '$lib/utils/products';

export async function getCartItems(ids: string): Promise<Product[]> {
  const res = await fetch(`${BACKEND_URL}/api/products?where[id][in]=${ids}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const json = await res.json();
  const products = json.docs as ProductDoc[];

  return products.map(buildProduct);
}
