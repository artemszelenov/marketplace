<script lang="ts">
  import { cartItems } from "$lib/stores/cart";

  $: cart_items_count = $cartItems.length;
</script>

<a
  href="/cart"
  class="px-2 py-2 text-sm text-black lg:px-6 md:px-3 hover:text-grey-600"
>
  {`Корзина (${cart_items_count})`}
</a>
