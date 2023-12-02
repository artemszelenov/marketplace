<script lang="ts">
  import type { StockItem, CartItemProduct } from "$lib/schema";

  import { sizeTitle } from "$lib/format/stockItem";
  import AddToCart from "./AddToCart.svelte";
  import { page } from "$app/stores";

  export let product: CartItemProduct;
  export let stock_item: StockItem;
</script>

<article class="flex space-x-5 actions-show-on-hover">
  <img
    class="w-28 aspect-square rounded object-cover"
    src={product.image}
    alt={product.title}
    decoding="async"
    loading="eager"
  />

  <div class="grow flex flex-col">
    <h1 class="font-semibold">
      <a href="/catalog/{stock_item.product_id}">
        {product.title}
      </a>
    </h1>

    <p class="text-sm">Цена: {product.price.toLocaleString("ru-RU") + " руб."}</p>

    <p class="text-sm">
      Размер: {sizeTitle({ stock_item: stock_item, product_type: product.type, user: $page.data.user })}
    </p>

    <div class="mt-auto">
      <AddToCart stockItem={stock_item} variant="compact" />
    </div>
  </div>
</article>
