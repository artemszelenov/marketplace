import { getProducts } from '$lib/server/cms/api/products';
import { buildProduct } from '$lib/utils/products';

export async function load() {
  const docs = await getProducts();

  const products = docs.map(buildProduct);

  return {
    products
  }
}
