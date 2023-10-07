<script lang="ts">
  import { onSet } from "nanostores";
  import CartItem from "./CartItem.svelte";
  import AuthForm from "./AuthForm.svelte";
  import { getProductsFromCartItems } from "../payload/cart";
  import { cartItemsStore } from "../stores/cart";

  export let user;

  let getProducts = getProductsFromCartItems;

  onSet(cartItemsStore, ({ newValue }) => {
    if (newValue.length !== $cartItemsStore.length) {
      getProducts = getProductsFromCartItems;
    }
  });
</script>

<h1 class="text-2xl font-bold">Корзина</h1>

<div class="grid grid-cols-2 mt-5">
  <div>
    {#await getProducts()}
      <p>Загрузка товаров...</p>
    {:then products}
      <ul class="space-y-7">
        {#each products as product (product.id)}
          <li>
            <CartItem {product} />
          </li>
        {/each}
      </ul>
    {/await}
  </div>

  <div>
    {#if user}
      <div>Вы зарегистрированы</div>
    {:else}
      <AuthForm />
    {/if}
  </div>
</div>
