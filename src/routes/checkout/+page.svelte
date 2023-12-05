<script lang="ts">
  import type { Order } from "$lib/schema";
  import { page } from "$app/stores";
  import CartItem from "$lib/components/CartItem.svelte";
  import AuthForm from "$lib/components/AuthForm.svelte";
  import Button from "$lib/components/UI/Button.svelte";
  import { cartItems as store } from "$lib/stores/cart";

  export let data;

  const cart_items = []
</script>

<h1 class="text-2xl font-bold">Оформление заказа</h1>

<div class="grid grid-cols-2 mt-5">
  <div>
    <!-- <AuthForm redirectTo="/cart" /> -->
    <p>адрес и доставка</p>
    <p>получатель</p>
    <p>оплата</p>
  </div>

  <div class="w-[25em]">
    <p class="mt-4 text-xl font-semibold">
      <span>Итого:</span>
      <!-- <span>{total.toLocaleString("ru-RU") + " руб."}</span> -->
    </p>

    <p>
      <span class="font-semibold">Доставка:</span>
    </p>

    <p>
      <span class="font-semibold">В вашей корзине:</span>
    </p>

    <ul class="space-y-7">
      {#each cart_items as { product, stock_item } (stock_item.id)}
        <li>
          <CartItem {product} />
        </li>
      {/each}
    </ul>
  </div>
</div>
