import qs from 'qs'
import { prepareImages } from '../../utils/images'
import { cartItemsStore } from '../../stores/cart'
import type { Product as ProductDoc } from '@/types/payload'
import type { Product } from '@/types/product'

export async function getProductsFromCartItems(): Promise<{ products: Product[] }> {
  const cartItems = cartItemsStore.get()

  if (cartItems.length === 0) return { products: [] }

  const ids = cartItems.map(item => item.id).join(',')

  const query = {
    id: {
      all: ids
    }
  }

  const stringifiedQuery = qs.stringify(
    {
      where: query
    },
    { addQueryPrefix: true }
  )

  const res = await fetch(`${import.meta.env.PUBLIC_SERVER_URL}/api/products${stringifiedQuery}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const json = await res.json()
  const products = json.docs as ProductDoc[]

  return {
    products: products.map(product => ({
      id: product.id,
      title: product.title,
      description: product.description,
      gallery: prepareImages(product.gallery, ['thumbnail', 'large']),
      price: product.defaultPrice.toLocaleString('ru-RU') + ' руб.',
      inStockCount: product.inStockCount
    }))
  }
}
