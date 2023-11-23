import { z } from "zod";

export const UserResult = z
  .object({
    id: z.string(),
    username: z.string(),
    name: z.string(),
    email: z.string().email(),
    verified: z.boolean(),
    preferred_shoe_size_metric: z.object({
      title: z.string(),
      value: z.enum(["eu", "uk"])
    }),
  });

export type User = z.infer<typeof UserResult>

export const ProductResult = z
  .object({
    id: z.string(),
    type: z.enum(["shoes", "pants"]),
    title: z.string(),
    description: z.string(),
    price: z.number(),
    gallery: z.array(z.string())
  });

export type Product = z.infer<typeof ProductResult>

export const ProductTeaserResult = z
  .object({
    id: z.string(),
    title: z.string(),
    price: z.number(),
    gallery: z.array(z.string())
  });

export type ProductTeaser = z.infer<typeof ProductTeaserResult>

export const StockItemResult = z
  .object({
    id: z.string(),
    product_id: z.string(),
    size_group_id: z.string(),
    count: z.number(),
    details: z.record(z.string())
  });

export type StockItem = z.infer<typeof StockItemResult>

export const CartItemResult = z
  .object({
    id: z.string(),
    product_id: z.string(),
    count: z.number()
  });

export type CartItem = z.infer<typeof CartItemResult>

export const OrderItemResult = z
  .object({
    id: z.string(),
    product: ProductResult,
    size: z.string(), // поменять
    quantity: z.number()
  });

export type OrderItem = z.infer<typeof OrderItemResult>

export const OrderResult = z
  .object({
    items: z.array(OrderItemResult),
    total: z.number()
  });

export type Order = z.infer<typeof OrderResult>
