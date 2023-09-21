interface Product {
  id: string
  quantity: number
}

interface ProductParams {
  productID: Product['id']
  inStockCount: number
}

interface Cart {
  items: Product[]
  isEmpty: boolean
  isSoldOut(params: ProductParams): boolean
  isProductInCart(params: ProductParams): boolean
  currentProduct(params: ProductParams): Product | null
  addOne(params: ProductParams): Product
  removeOne(params: ProductParams): Product | null
}

export type { Cart }
