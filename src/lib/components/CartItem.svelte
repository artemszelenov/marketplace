<script lang="ts">
  import RemoveFromCartForm from "./forms/RemoveFromCartForm.svelte";
  import type { CartItem } from "$lib/schema";

  export let cart_item: CartItem;
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
      Размер: 
    </p>

    <div class="mt-auto">
      <RemoveFromCartForm cart_item_id={cart_item.id} />
    </div>
  </div>
</article>
