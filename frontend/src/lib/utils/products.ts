import type { z } from "zod";
import { prepareImages } from "./images";
import type { Product as ProductDoc } from "$lib/server/cms/types";
import type { ProductResult } from "$lib/schema";

type Product = z.infer<typeof ProductResult>

export const buildProduct = (product: ProductDoc): Product => {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    gallery: prepareImages(product.gallery),
    price: product.defaultPrice, // добавить доставку сюда
    inStockCount: product.inStockCount
  }
}
