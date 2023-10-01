<script lang="ts">
  import CartItem from "./CartItem.svelte";
  import { getProductsFromCartItems } from "../api/client/cart";
</script>

<div class="grid grid-cols-2">
  {#await getProductsFromCartItems()}
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
