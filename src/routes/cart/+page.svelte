<script lang="ts">
  import type { OrderItem, Order } from "$lib/schema";
  import { page } from "$app/stores";
  import CartItem from "$lib/components/CartItem.svelte";
  import AuthForm from "$lib/components/AuthForm.svelte";
  import Button from "$lib/components/UI/Button.svelte";
  import { cartItems as store, queryString } from "$lib/stores/cart";

  export let data;

  const { cart_items } = data;

  let orderItems: OrderItem[] = [];
  let total = 0;
  let order: Order = {
    items: orderItems,
    total,
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

      <form method="POST" action="?/proceedOrder" class="mt-4">
        <input type="hidden" name="order" value={JSON.stringify(order)} />

        <Button
          variant="primary"
          extraClasses="w-full"
          title="Подтвердить заказ"
          type="submit"
          disabled={!$page.data.user}
        >
          Подтвердить заказ
        </Button>
      </form>

      {#if !$page.data.user}
        <p class="mt-2 text-sm">
          Вам нужно зарегистрироваться или войти, чтобы продолжить
        </p>

        <div class="mt-4">
          <AuthForm redirectTo="/cart{$queryString}" />
        </div>
      {/if}
    </div>
  {/if}
</div>
