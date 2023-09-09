import type { Product } from "@/payload-types"
import { prepareImages } from "../utils/images"

export async function getProducts() {
  const res = await fetch('http://localhost:4000/api/products')
  const json = await res.json()
  const products = json.docs as Product[]

  return {
    products: products.map((product) => ({
      ...product,
      gallery: prepareImages(product.gallery, ['thumbnail', 'medium', 'large'])
    }))
  }
}

export async function getStaticProduct() {
  const res = await fetch('http://localhost:4000/api/products')
  const json = await res.json()
  const products = json.docs as Product[]

  return products.map((product) => {
    return {
      params: {
        slug: product.id
      },
      props: {
        title: product.title,
        description: product.description,
        gallery: prepareImages(product.gallery, ['thumbnail'])
      }
    }
  })
}
