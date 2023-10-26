import { z } from "zod";

export const ImageResult = z
  .object({
    src: z.string(),
    srcset: z.string(),
    width: z.number(),
    height: z.number(),
    alt: z.string(),
    thumbnail: z.object({
      src: z.string(),
      width: z.number(),
      height: z.number(),
      alt: z.string(),
    }),
  });

export const ProductResult = z
  .object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    inStockCount: z.number(),
    price: z.number(),
    gallery: z.array(ImageResult),
  });

export const StorageCartItemResult = z
  .object({
    id: z.string(),
    q: z.number()
  })