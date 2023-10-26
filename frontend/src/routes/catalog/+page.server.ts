import { getProducts } from '$lib/server/cms/api/products';
import { buildProduct } from '$lib/utils/products';

export async function load({ fetch }) {
  const docs = await getProducts(fetch);

  const products = docs.map(buildProduct);

  return {
    products,
    seo: {
      title: "Каталог"
    }
  }
}
