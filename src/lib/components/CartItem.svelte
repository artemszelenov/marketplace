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

<article class="flex space-x-5 actions-show-on-hover">
  <img
    class="w-28 aspect-square rounded object-cover"
    src={cart_item.product.image}
    alt={cart_item.product.title}
    decoding="async"
    loading="eager"
  />

  <div class="grow flex flex-col">
    <h1 class="font-semibold">
      <a href="/catalog/{cart_item.product?.id}?size={cart_item.stock_item.id}">
        {cart_item.product.title}
      </a>
    </h1>

    <p class="text-sm">Цена: {cart_item.product.price.toLocaleString("ru-RU") + " ₽"}</p>

    <p class="text-sm">
      Размер: {getSizeTitleFrom(cart_item.stock_item)}
    </p>

    <p class="text-sm">
      Количество: {cart_item.quantity}
    </p>

    <p class="text-sm">
      Цвет: 
    </p>

    <div class="mt-auto">
      <RemoveFromCartForm cart_item_id={cart_item.id} />
    </div>
  </div>
</article>
