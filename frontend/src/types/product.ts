import type { Product as ProductDoc } from './payload'
import type { Image } from './image'

type PickedKeysProductDoc = Pick<ProductDoc, 'id' | 'title' | 'inStockCount' | 'description'>
export interface Product extends PickedKeysProductDoc {
  gallery: Image[]
  price: string
}
