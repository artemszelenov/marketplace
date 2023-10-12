import { getProduct } from '../../services/cms/api/products'
import { buildProduct } from '../../utils/products'
import type { APIContext } from "astro";

export const GET = async (params: APIContext['params']) => {
  const { slug } = params;
  const product = await getProduct(slug);

  return new Response(JSON.stringify(buildProduct(product)));
}
