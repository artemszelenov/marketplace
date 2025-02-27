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

<article class="grid gap-4 md:gap-7 grid-flow-col">
  <img
    class="max-w-20 md:max-w-36 aspect-square rounded object-cover"
    src={order_item.product.image}
    alt={order_item.product.title}
    decoding="async"
    loading="eager"
  />

  <div>
    <h1 class="md:text-lg font-semibold">
      <a href="/catalog/{order_item.product?.id}?size={order_item.stock_item.id}">
        {order_item.product.title}
      </a>
    </h1>

    <div class="flex items-end">
      <table class="w-48 mt-4">
        <tbody>
          <tr>
            <td class="text-sm">Price</td>
            <td class="text-sm font-medium">{order_item.product.price.toLocaleString("en") + " S"}</td>
          </tr>
          <tr>
            <td class="text-sm">Size</td>
            <td class="text-sm font-medium">{getSizeTitleFrom(order_item.stock_item)}</td>
          </tr>
          <tr>
            <td class="text-sm">Quantity</td>
            <td class="text-sm font-medium">{order_item.quantity}</td>
          </tr>
          <tr>
            <td class="text-sm">Color</td>
            <td class="text-sm font-medium">{order_item.product.color}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</article>
