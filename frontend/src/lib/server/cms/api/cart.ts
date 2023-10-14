import type { z } from "zod";
import type { Product as ProductDoc } from '../types';
import type { ProductResult } from "$lib/schema";
import qs from 'qs';
import { BACKEND_URL } from "$env/static/private";
import { buildProduct } from '$lib/utils/products';
import { cartItemsStore } from '$lib/stores/cart';

type Product = z.infer<typeof ProductResult>

export async function getProductsFromCartItems(): Promise<Product[]> {
  const cartItems = cartItemsStore.get()

  if (cartItems.length === 0) return []

  const ids = cartItems.map(item => item.id).join(',')

  const query = {
    id: {
      in: ids
    }
  }

  const stringifiedQuery = qs.stringify(
    {
      where: query
    },
    {
      addQueryPrefix: true,
      encode: false
    }
  )

  const res = await fetch(`${BACKEND_URL}/api/products${stringifiedQuery}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const json = await res.json()
  const products = json.docs as ProductDoc[]

  return products.map(buildProduct)
}
