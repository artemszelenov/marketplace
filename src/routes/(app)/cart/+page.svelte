<script lang="ts">
  import CartItem from "$lib/components/CartItem.svelte";
  import Button from "$lib/components/UI/Button.svelte";

  export let data;
  
  $: total = data.cart_items.reduce((accum, cart_item) => {
    return accum += cart_item.product.price * cart_item.quantity
  }, 0);
</script>

<h1 class="text-2xl font-bold text-gray-900">Корзина</h1>

<div class="grid grid-cols-[1fr_30rem] gap-32 mt-10">
  {#if data.cart_items.length === 0}
    <p>
      В корзине пусто. Добавьте, что-нибудь из
      <a href="/catalog">каталога</a>
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

    <div>
      <p class="text-xl font-semibold">
        Стоимость без учета доставки
      </p>

      <p class="mt-4 text-xl font-semibold">
        {total.toLocaleString("ru-RU") + " ₽"}
      </p>

      <p class="mt-4">
        <Button
          as="link"
          href="/checkout"
          title="Оформить заказ"
          size="xs"
        >
          <span slot="text">Оформить заказ</span>
        </Button>
      </p>
    </div>
  {/if}
</div>
