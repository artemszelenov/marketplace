import { prepareImages } from '../utils/images'
import type { Product } from '@/payload-types'

export async function getProducts() {
  const res = await fetch('http://localhost:4000/api/products')
  const json = await res.json()
  const products = json.docs as Product[]

  return {
    products: products.map(product => ({
      ...product,
      gallery: prepareImages(product.gallery, ['thumbnail', 'large']),
      price: product.defaultPrice.toLocaleString('ru-RU') + ' руб.'
    }))
  }
}

export async function getStaticProduct() {
  const res = await fetch('http://localhost:4000/api/products')
  const json = await res.json()
  const products = json.docs as Product[]

  return products.map(product => {
    return {
      params: {
        slug: product.id
      },
      props: {
        id: product.id,
        title: product.title,
        description: product.description,
        gallery: prepareImages(product.gallery, ['thumbnail']),
        price: product.defaultPrice.toLocaleString('ru-RU') + ' руб.',
        inStockCount: product.inStockCount
      }
    }
  })
}
