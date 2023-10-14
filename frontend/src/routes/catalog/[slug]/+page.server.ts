import { getProduct } from '$lib/server/cms/api/products';
import { buildProduct } from '$lib/utils/products';

export async function load({ params }) {
  const product = await getProduct(params.slug);

  return {
    product: buildProduct(product)
  }
}
