<script lang="ts">
  import CartItem from "$lib/components/CartItem.svelte";
  import AuthForm from "$lib/components/AuthForm.svelte";
  import { cartItems as store, queryString } from "$lib/stores/cart";

  export let data;

  const { user, cartItems: initialCartItems } = data;

  let cartItems = initialCartItems;

  $: {
    cartItems = initialCartItems.filter((initCartItem) =>
      $store.some((cartItem) => initCartItem.id === cartItem.id)
    );
  }
</script>

<div class="px-8 py-12 mx-auto max-w-7xl md:px-12">
  <h1 class="text-2xl font-bold">Корзина</h1>

  <div class="grid grid-cols-2 mt-5">
    <ul class="space-y-7">
      {#each cartItems as product (product.id)}
        <li>
          <CartItem {product} />
        </li>
      {/each}
    </ul>

    <div>
      {#if user}
        <div>Вы зарегистрированы</div>
      {:else}
        <AuthForm redirectTo="/cart{$queryString}" />
      {/if}
    </div>
  </div>
</div>
