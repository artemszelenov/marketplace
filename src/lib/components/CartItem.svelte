<script lang="ts">
  import type { CartItem } from "$lib/schema";

  import { sizeTitle } from "$lib/format/stockItem";
  import AddToCart from "./AddToCart.svelte";
  import { page } from "$app/stores";

  export let cartItem: CartItem;

  const { id, title, price, image, type } = cartItem;
</script>

<article class="flex space-x-5 actions-show-on-hover">
  <img
    class="w-28 aspect-square rounded object-cover"
    src={image}
    alt={title}
    decoding="async"
    loading="eager"
  />

  <div class="grow flex flex-col">
    <h1 class="font-semibold">
      <a href="/catalog/{id}">
        {title}
      </a>
    </h1>

    <p class="text-sm">Цена: {price.toLocaleString("ru-RU") + " руб."}</p>

    <p class="text-sm">
      Размер: {sizeTitle({ stock_item: cartItem.stock_item, product_type: type, user: $page.data.user })}
    </p>

    <div class="mt-auto">
      <AddToCart stockItem={cartItem.stock_item} variant="compact" />
    </div>
  </div>
</article>
