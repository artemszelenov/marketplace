interface Product {
  id: string
  quantity: number
}

interface ProductParams {
  productID: Product['id']
}

interface Cart {
  items: Product[]
  isEmpty: boolean
  isProductInCart(params: ProductParams): boolean
  currentProduct(params: ProductParams): Product | null
  addOne(params: ProductParams): Product
  removeOne(params: ProductParams): Product | null
}

export type { Cart }
