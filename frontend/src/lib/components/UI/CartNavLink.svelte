<script lang="ts">
  import { cartItemsStore } from "$lib/stores/cart";

  $: cartIsEmpty = $cartItemsStore.length === 0;
</script>

<a
  href="/cart"
  class="relative px-2 py-2 text-sm text-black lg:px-6 md:px-3 hover:text-grey-600"
  class:cart-is-not-empty-indicator={!cartIsEmpty}
>
  Корзина
</a>
