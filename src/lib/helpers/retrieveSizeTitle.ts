import { preferredShoesSizeMetric } from "$lib/stores/preferredSizeMetrics";
import type { StockItem } from "$lib/schema";

type Params = {
  stock_item: StockItem,
  product_type: string
}

// вынести этот хелпер в данные после создания аутентификации
export function retrieveSizeTitle({ stock_item: { details, size_group_id }, product_type }: Params) {
  return product_type === "shoes"
    ? details[size_group_id][preferredShoesSizeMetric.get().value ?? "eu"]?.title
    : details[size_group_id].unknown_metric?.title;
}
