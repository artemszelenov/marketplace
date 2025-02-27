<script lang="ts">
  import CartItem from "$lib/components/CartItem.svelte";
  import Button from "$lib/components/UI/Button.svelte";

  export let data;

  $: total = data.cart_items.reduce((accum, cart_item) => {
    return (accum += cart_item.product.price * cart_item.quantity);
  }, 0);
</script>

<h1 class="text-2xl font-bold">Cart</h1>

<div
  class="md:grid md:grid-cols-[0.8fr_27rem] md:justify-between md:items-start md:gap-16 mt-8 pb-10"
>
  {#if data.cart_items.length === 0}
    <p>
      The cart is empty. Add something from
      <a href="/catalog">catalog</a>
    </p>
  {:else}
    <div>
      <ul class="space-y-10">
        {#each data.cart_items as cart_item (cart_item.id)}
          <li>
            <CartItem {cart_item} />
          </li>
        {/each}
      </ul>
    </div>

    <div class="mt-10 md:mt-0">
      <div class="grid grid-cols-[1.3fr_0.7fr] justify-items-end gap-4">
        <p class="text-xl font-semibold">Total</p>

        <p class="text-xl font-semibold">
          {total.toLocaleString("en") + " $"}
        </p>
      </div>

      <div class="ml-auto w-max mt-4">
        <Button title="Оформить заказ" disabled>
          <span slot="text">Go to checkout</span>
        </Button>
      </div>
    </div>
  {/if}
</div>
