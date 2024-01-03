<script lang="ts">
  import type { Order } from "$lib/schema";
  import { page } from "$app/stores";
  import CartItem from "$lib/components/CartItem.svelte";
  import AuthForm from "$lib/components/forms/AuthForm.svelte";
  import Button from "$lib/components/UI/Button.svelte";

  export let data;

  const cart_items = [];
</script>

<div class="grid grid-cols-[1fr_25em] gap-20 mt-5">
  <div>
    <div class="flex items-center justify-between">
      <p class="text-xl font-bold">Доставка</p>

      <Button
        size="xs"
        title="ШАГ 1 ИЗ 3"
      >
        <span slot="text">ШАГ 1 ИЗ 3</span>
        <svg slot="icon" width="17" height="10" viewBox="0 0 17 10" fill="none">
          <path d="M1.9375 8.23437L8.5 1.67187L15.0625 8.23438" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </Button>
    </div>

    <p>получатель</p>
    <p>оплата</p>
  </div>

  <div>
    <p>
      <span class="font-semibold">Ваш заказ</span>
    </p>

    <p>
      <span class="font-semibold">Стоимость доставки</span>
    </p>

    <p class="mt-4 text-xl font-semibold">
      <span>Итого</span>
    </p>
  </div>
</div>
