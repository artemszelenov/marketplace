<script lang="ts">
  import { preferredShoesSizeMetric } from "$lib/stores/preferredShoesSizeMetric";
  import type { OrderItem, StockItem } from "$lib/schema";

  export let order_item: OrderItem;

  function getSizeTitleFrom(stock_item: StockItem) {
    return order_item.product.type === "shoes"
      ? stock_item.metrics[$preferredShoesSizeMetric]
      : stock_item.metrics.intl
  }
</script>

<article class="flex space-x-5">
  <img
    class="max-w-24 aspect-square rounded object-cover"
    src={order_item.product.image}
    alt={order_item.product.title}
    decoding="async"
    loading="eager"
  />

  <div class="grow flex flex-col">
    <h1 class="text-base font-semibold">
      <a href="/catalog/{order_item.product?.id}?size={order_item.stock_item.id}">
        {order_item.product.title}
      </a>
    </h1>

    <table class="w-48 mt-2">
      <tbody>
        <tr>
          <td class="text-sm">Цена</td>
          <td class="text-sm font-medium">{order_item.product.price.toLocaleString("ru-RU") + " ₽"}</td>
        </tr>
        <tr>
          <td class="text-sm">Размер</td>
          <td class="text-sm font-medium">{getSizeTitleFrom(order_item.stock_item)}</td>
        </tr>
        <tr>
          <td class="text-sm">Количество</td>
          <td class="text-sm font-medium">{order_item.quantity}</td>
        </tr>
        <tr>
          <td class="text-sm">Цвет</td>
          <td class="text-sm font-medium">{order_item.product.color}</td>
        </tr>
      </tbody>
    </table>
  </div>
</article>
