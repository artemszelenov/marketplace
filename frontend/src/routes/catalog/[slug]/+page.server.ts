import { getProduct } from '$lib/server/cms/api/products';
import { buildProduct } from '$lib/utils/products';

export async function load({ params, fetch }) {
  const product = await getProduct(fetch, params.slug);

  return {
    product: buildProduct(product),
    seo: {
      title: product.title
    }
  }
}
