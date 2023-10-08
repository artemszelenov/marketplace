import qs from 'qs'
import { buildProduct } from '../../utils/products'
import { cartItemsStore } from '../../stores/cart'
import type { Product as ProductDoc } from '@/types/payload'
import type { Product } from '@/types/product'

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

  const res = await fetch(`${import.meta.env.PUBLIC_BACKEND_URL}/api/products${stringifiedQuery}`, {
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
