import type { StockItem, User } from "$lib/schema";

type Params = {
  stock_item: StockItem,
  product_type: string,
  user: User | null
}

// вынести этот хелпер в данные после создания аутентификации
export function sizeTitle({ stock_item: { details, size_group_id }, product_type, user }: Params) {
  return product_type === "shoes"
    ? details[size_group_id][user?.preferred_shoe_size_metric.value ?? "eu"]?.title
    : details[size_group_id].unknown_metric?.title;
}
