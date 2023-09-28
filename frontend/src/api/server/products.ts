import { prepareImages } from '../../utils/images'
import type { Product as ProductDoc } from '@/types/payload'
import type { Product } from '@/types/product'

export async function getProducts(): Promise<{ products: Product[] }> {
  const res = await fetch(`${import.meta.env.PUBLIC_SERVER_URL}/api/products`)
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

export async function getStaticProduct() {
  const res = await fetch(`${import.meta.env.PUBLIC_SERVER_URL}/api/products`)
  const json = await res.json()
  const products = json.docs as ProductDoc[]

  const buildProduct = (product: ProductDoc): Product => {
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      gallery: prepareImages(product.gallery, ['thumbnail']),
      price: product.defaultPrice.toLocaleString('ru-RU') + ' руб.',
      inStockCount: product.inStockCount
    }
  }

  return products.map(product => {
    return {
      params: {
        slug: product.id
      },
      props: {
        product: buildProduct(product)
      }
    }
  })
}
