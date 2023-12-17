<script lang="ts">
  import type { Order } from "$lib/schema";
  import CartItem from "$lib/components/CartItem.svelte";

  export let data;
  
  $: total = data.cart_items.reduce((accum, cart_item) => {
    return accum += cart_item.product.price * cart_item.quantity
  }, 0);

  let order: Order = {
    paid_total: total,
  };
</script>

<h1 class="text-2xl font-bold text-gray-900">Корзина</h1>

<div class="grid grid-cols-2 mt-5">
  {#if data.cart_items.length === 0}
    <p>
      В корзине пусто. Добавьте, что-нибудь из
      <a href="/catalog">каталога</a>
    </p>
  {:else}
    <div>
      <ul class="space-y-7">
        {#each data.cart_items as cart_item (cart_item.id)}
          <li>
            <CartItem {cart_item} />
          </li>
        {/each}
      </ul>
    </div>

    <div class="w-[25em]">
      <p>
        <span class="font-semibold">Доставка:</span>
      </p>

      <p class="mt-4 text-xl font-semibold">
        <span>Итого:</span>
        <span>{total.toLocaleString("ru-RU") + " ₽"}</span>
      </p>

      <p class="mt-4">
        <a href="/checkout">Оформить заказ</a>
      </p>
    </div>
  {/if}
</div>
