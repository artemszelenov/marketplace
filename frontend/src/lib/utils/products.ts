import { prepareImages } from "./images"
import type { Product as ProductDoc } from '$lib/types/payload'
import type { Product } from '$lib/types/product'

export const buildProduct = (product: ProductDoc): Product => {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    gallery: prepareImages(product.gallery),
    price: product.defaultPrice.toLocaleString('ru-RU') + ' руб.',
    inStockCount: product.inStockCount
  }
}
