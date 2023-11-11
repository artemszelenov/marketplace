import { z } from "zod";

export const UserResult = z
  .object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    roles: z.array(z.string()),
    shoeSizeMetric: z.enum(['eu', 'uk']),
  });

export type User = z.infer<typeof UserResult>

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

export const SizeResult = z
  .object({
    id: z.string(),
    inStockCount: z.number(),
    size: z.object({
      relationTo: z.enum(['shoe-sizes', 'clothing-sizes']),
      value: z.record(z.string())
    })
  });

export type Size = z.infer<typeof SizeResult>

export const ProductResult = z
  .object({
    id: z.string(),
    type: z.enum(['shoes', 'clothes', 'accessories']),
    title: z.string(),
    description: z.string(),
    price: z.number(),
    gallery: z.array(ImageResult),
    sizes: z.array(SizeResult)
  });

export type Product = z.infer<typeof ProductResult>

export const CartItemResult = z
  .object({
    id: z.string(), // consists of two parts: {id of product}:{id of size}
    product: ProductResult,
    size: SizeResult
  });

export const OrderItemResult = z
  .object({
    id: z.string(), // consists of two parts: {id of product}:{id of size}
    product: ProductResult,
    size: SizeResult,
    quantity: z.number()
  });

export type OrderItem = z.infer<typeof OrderItemResult>

export const StorageCartItemResult = z
  .object({
    id: z.string(), // consists of two parts: {id of product}:{id of size}
    q: z.number()
  });

export type StorageCartItem = z.infer<typeof StorageCartItemResult>

export const OrderResult = z
  .object({
    items: z.array(z.object({
      id: z.string(), // consists of two parts: {id of product}:{id of size}
      quantity: z.number(),
      product: z.object({
        title: z.string()
      }),
      size: z.object({
        valueID: z.string(),
        relationTo: z.enum(['shoe-sizes', 'clothing-sizes']),
      })
    })),
    total: z.number()
  });

export type Order = z.infer<typeof OrderResult>
