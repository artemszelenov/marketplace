<script lang="ts">
  import RemoveFromCartForm from "./forms/RemoveFromCartForm.svelte";
  import { preferredShoesSizeMetric } from "$lib/stores/preferredShoesSizeMetric";
  import type { CartItem, StockItem } from "$lib/schema";

  export let cart_item: CartItem;

  function getSizeTitleFrom(stock_item: StockItem) {
    return cart_item.product.type === "shoes"
      ? stock_item.metrics[$preferredShoesSizeMetric]
      : stock_item.metrics.intl
  }
</script>

<article class="flex space-x-7">
  <img
    class="max-w-36 aspect-square rounded object-cover"
    src={cart_item.product.image}
    alt={cart_item.product.title}
    decoding="async"
    loading="eager"
  />

  <div class="grow flex flex-col">
    <h1 class="text-lg font-semibold">
      <a href="/catalog/{cart_item.product?.id}?size={cart_item.stock_item.id}">
        {cart_item.product.title}
      </a>
    </h1>

    <div class="flex items-end">
      <table class="w-48 mt-4">
        <tbody>
          <tr>
            <td class="text-sm">Цена</td>
            <td class="text-sm font-medium">{cart_item.product.price.toLocaleString("ru-RU") + " ₽"}</td>
          </tr>
          <tr>
            <td class="text-sm">Размер</td>
            <td class="text-sm font-medium">{getSizeTitleFrom(cart_item.stock_item)}</td>
          </tr>
          <tr>
            <td class="text-sm">Количество</td>
            <td class="text-sm font-medium">{cart_item.quantity}</td>
          </tr>
          <tr>
            <td class="text-sm">Цвет</td>
            <td class="text-sm font-medium">{cart_item.product.color}</td>
          </tr>
        </tbody>
      </table>
  
      <div class="ml-auto">
        <RemoveFromCartForm cart_item_id={cart_item.id} />
      </div>
    </div>
  </div>
</article>
