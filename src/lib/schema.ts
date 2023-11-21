import { z } from "zod";

export const UserResult = z
  .object({
    id: z.string(),
    username: z.string(),
    name: z.string(),
    email: z.string().email(),
    verified: z.boolean(),
    preferred_size_metric: z.string(),
  });

export type User = z.infer<typeof UserResult>

export const ProductResult = z
  .object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    price: z.number(),
    gallery: z.array(z.string())
  });

export type Product = z.infer<typeof ProductResult>

export const OrderItemResult = z
  .object({
    id: z.string(),
    product: ProductResult,
    size: z.string(), // поменять
    quantity: z.number()
  });

export type OrderItem = z.infer<typeof OrderItemResult>

export const StorageCartItemResult = z
  .object({
    stock_item_id: z.string(),
    quantity: z.number()
  });

export type StorageCartItem = z.infer<typeof StorageCartItemResult>

export const OrderResult = z
  .object({
    items: z.array(OrderItemResult),
    total: z.number()
  });

export type Order = z.infer<typeof OrderResult>
