import type { z } from "zod";
import { prepareImages } from "./images";
import type { Product as ProductDoc } from "$lib/server/cms/types";
import type { Product } from "$lib/schema";

export const buildProduct = (product: ProductDoc): Product => {
  return {
    id: product.id,
    type: product.type,
    title: product.title,
    description: product.description,
    gallery: prepareImages(product.gallery),
    price: product.defaultPrice, // добавить доставку сюда
    sizes: product.sizes ?? [],
  }
}
