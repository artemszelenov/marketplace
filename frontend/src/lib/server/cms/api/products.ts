import type { Product as ProductDoc } from "../types";
import { BACKEND_URL } from "$env/static/private";

export async function getProducts(query: typeof fetch): Promise<ProductDoc[]> {
  const res = await query(`${BACKEND_URL}/api/products`);
  const json = await res.json();
  return json.docs as ProductDoc[];
}

export async function getProduct(query: typeof fetch, slug: string): Promise<ProductDoc> {
  const res = await query(`${BACKEND_URL}/api/products/${slug}`);
  const product = await res.json() as ProductDoc;
  return product;
}
