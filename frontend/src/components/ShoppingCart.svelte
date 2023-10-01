<script lang="ts">
  import { onSet } from "nanostores";
  import CartItem from "./CartItem.svelte";
  import { getProductsFromCartItems } from "../api/client/cart";
  import { cartItemsStore } from "../stores/cart";

  let products = getProductsFromCartItems;

  onSet(cartItemsStore, ({ newValue }) => {
    if (newValue.length !== $cartItemsStore.length) {
      products = getProductsFromCartItems;
    }
  });
</script>

<div class="grid grid-cols-2">
  {#await products()}
    <p>Загрузка корзины...</p>
  {:then { products }}
    <ul class="space-y-7">
      {#each products as product}
        <li>
          <CartItem {product} />
        </li>
      {/each}
    </ul>
  {/await}
</div>
