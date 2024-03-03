import { z } from "zod";

export const SHOES_METRICS = ["eu", "uk", "us"] as const;
export const GLOBAL_METRICS = ["intl"] as const;
export const ALL_METRICS = [...SHOES_METRICS, ...GLOBAL_METRICS] as const;

export const UserSchema = z
  .object({
    id: z.string(),
    username: z.string(),
    name: z.string().optional(),
    email: z.string().email(),
    verified: z.boolean()
  });

export type User = z.infer<typeof UserSchema>

export const ProductTypeSchema = z.enum(["shoes", "pants"]);

export const ProductSchema = z
  .object({
    id: z.string(),
    type: ProductTypeSchema,
    title: z.string(),
    description: z.string(),
    price: z.number(),
    gallery: z.array(z.string()),
    image: z.string(),
    color: z.string()
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

export const StockItemsMetricsSchema = z.enum(ALL_METRICS)

export const StockItemSchema = z
  .object({
    id: z.string(),
    product_id: z.string(),
    count: z.number(),
    metrics: z.record(
        StockItemsMetricsSchema, z.string()
      )
  });

export type StockItem = z.infer<typeof StockItemSchema>

export const CartItemSchema = z
  .object({
    id: z.string(),
    quantity: z.number(),
    product: ProductSchema,
    stock_item: StockItemSchema
  });

export type CartItem = z.infer<typeof CartItemSchema>

export type OrderItem = z.infer<typeof CartItemSchema>

export const StoragePreferredShoesSizeMetricSchema = z.enum(SHOES_METRICS);

export type StoragePreferredShoesSizeMetric = z.infer<typeof StoragePreferredShoesSizeMetricSchema>

export const OrderSchema = z
  .object({
    paid_total: z.number(),
  });

export type Order = z.infer<typeof OrderSchema>
