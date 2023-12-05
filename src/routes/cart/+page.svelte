<script lang="ts">
  import type { Order } from "$lib/schema";
  import { page } from "$app/stores";
  import CartItem from "$lib/components/CartItem.svelte";
  import AuthForm from "$lib/components/AuthForm.svelte";
  import Button from "$lib/components/UI/Button.svelte";
  import { cartItems as store } from "$lib/stores/cart";

  export let data;

  $: cart_items = data.cart_items.filter(
    data_cart_item => $store.find(
      store_cart_item => store_cart_item.id === data_cart_item.stock_item.id
    )
  );
  
  $: total = data.cart_items.reduce((accum, { product, stock_item }) => {
    const store_cart_item = $store.find(store_cart_item => store_cart_item.id === stock_item.id);
    if (store_cart_item) {
      return accum += product.price * store_cart_item.count
    }
    return accum
  }, 0);

  let order: Order = {
    items: store.get(),
    paid_total: total,
  };
</script>

<h1 class="text-2xl font-bold">Корзина</h1>

<div class="grid grid-cols-2 mt-5">
  {#if cart_items.length === 0}
    <p>
      В корзине пусто. Добавьте, что-нибудь из
      <a href="/catalog">каталога</a>
    </p>
  {:else}
    <div>
      <ul class="space-y-7">
        {#each cart_items as { product, stock_item } (stock_item.id)}
          <li>
            <CartItem {product} {stock_item} />
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
        <span>{total.toLocaleString("ru-RU") + " руб."}</span>
      </p>

      <p class="mt-4">
        <a href="/checkout">Оформить заказ</a>
      </p>
    </div>
  {/if}
</div>
