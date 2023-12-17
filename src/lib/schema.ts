import { z } from "zod";

export const UserSchema = z
  .object({
    id: z.string(),
    username: z.string(),
    name: z.string().optional(),
    email: z.string().email(),
    verified: z.boolean()
  });

export type User = z.infer<typeof UserSchema>

export const ProductSchema = z
  .object({
    id: z.string(),
    type: z.enum(["shoes", "pants"]),
    title: z.string(),
    description: z.string(),
    price: z.number(),
    gallery: z.array(z.string()),
    image: z.string()
  });

export type Product = z.infer<typeof ProductSchema>

export const ProductTeaserSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    price: z.number(),
    gallery: z.array(z.string())
  });

export type ProductTeaser = z.infer<typeof ProductTeaserSchema>

export const StockItemSchema = z
  .object({
    id: z.string(),
    product_id: z.string(),
    count: z.number(),
    metrics: z.record(
      z.enum(["eu", "uk", "us"]), z.string()
    )
  });

export type StockItem = z.infer<typeof StockItemSchema>

export const CartItemSchema = z
  .object({
    id: z.string(),
    product: ProductSchema,
    stock_item: StockItemSchema
  });

export type CartItem = z.infer<typeof CartItemSchema>

export const StoragePreferredShoesSizeMetricSchema = z.enum(["eu", "uk", "us"]);

export type StoragePreferredShoesSizeMetric = z.infer<typeof StoragePreferredShoesSizeMetricSchema>

export const OrderSchema = z
  .object({
    paid_total: z.number(),
  });

export type Order = z.infer<typeof OrderSchema>
