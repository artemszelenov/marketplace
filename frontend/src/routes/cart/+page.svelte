<script lang="ts">
  import { page } from "$app/stores";
  import CartItem from "$lib/components/CartItem.svelte";
  import AuthForm from "$lib/components/AuthForm.svelte";
  import Button from "$lib/components/UI/Button.svelte";
  import { cartItems as store, queryString } from "$lib/stores/cart";

  export let data;

  const { cartItems: initialCartItems } = data;

  let cartItems = initialCartItems;
  let total = 0;

  $: {
    cartItems = initialCartItems.filter((initCartItem) =>
      $store.some((storeItem) => initCartItem.id === storeItem.id)
    );

    total = cartItems.reduce((acc, item) => {
      const quantity = $store.find((storeItem) => storeItem.id === item.id)!.q;
      acc += item.price * quantity;
      return acc;
    }, 0);
  }
</script>

<h1 class="text-2xl font-bold">Корзина</h1>

<div class="grid grid-cols-2 mt-5">
  <div>
    <ul class="space-y-7">
      {#each cartItems as product (product.id)}
        <li>
          <CartItem {product} />
        </li>
      {/each}
    </ul>
  </div>

  <div class="w-[25em]">
    <p>
      <span class="font-semibold">Доставка:</span>
    </p>

    <p class="mt-4 text-xl font-semibold">
      <span class="">Итого:</span>
      <span>{total.toLocaleString("ru-RU") + " руб."}</span>
    </p>

    <p class="mt-4">
      <Button
        variant="primary"
        extraClasses="w-full"
        title="Подтвердить заказ"
        type="submit"
        disabled={!$page.data.user}
      >
        Подтвердить заказ
      </Button>
    </p>

    {#if !$page.data.user}
      <p class="mt-2 text-sm">
        Вам нужно зарегистрироваться или войти, чтобы продолжить
      </p>

      <div class="mt-4">
        <AuthForm redirectTo="/cart{$queryString}" />
      </div>
    {/if}
  </div>
</div>
