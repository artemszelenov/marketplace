import type { Product as ProductDoc } from '@/types/payload'

export async function getProducts(): Promise<ProductDoc[]> {
  const res = await fetch(`${import.meta.env.PUBLIC_BACKEND_URL}/api/products`)
  const json = await res.json()
  const products = json.docs as ProductDoc[]
  return products
}

export async function getProduct(slug: string): Promise<ProductDoc> {
  const res = await fetch(`${import.meta.env.PUBLIC_BACKEND_URL}/api/products/${slug}`);
  const product = await res.json() as ProductDoc;
  return product
}
