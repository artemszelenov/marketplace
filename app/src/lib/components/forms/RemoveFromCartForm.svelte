<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  import Button from "$lib/components/UI/Button.svelte";

  export let cart_item_id: string;
</script>

<form action="/cart?/remove" method="POST" use:enhance>
  <input type="hidden" name="cart-item" value={cart_item_id}>
  <input type="hidden" name="from" value={$page.url.pathname + $page.url.search}>

  <Button
    title="Удалить из корзины"
    type="submit"
    size="xs"
    appearance="silent"
  >
    <svg slot="icon" viewBox="0 0 512 512" aria-hidden="true">
      <path fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M400 256H112" />
    </svg>
  </Button>
</form>
