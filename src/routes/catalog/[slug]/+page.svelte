<script lang="ts">
  import AddToCart from "$lib/components/AddToCart.svelte";
  import { cartItems } from "$lib/stores/cart";
  import type { CartItem, StockItem } from "$lib/schema";

  export let data;

  const { type, title, description, gallery, price, id: product_id } = data.product;

  let currentStockItem: CartItem | undefined = $cartItems.find(item => item.product_id === product_id);

  function handleChangeSize(sizePayload: CartItem) {
    return () => {
      currentStockItem = sizePayload;
    };
  }

  function sizeTitle(size: StockItem) {
    return type === "shoes"
      ? size.details[size.size_group_id][data.user?.preferred_shoe_size_metric.value ?? "eu"].title
      : size.details[size.size_group_id].international.title;
  }
</script>

<div
  class="lg:gap-x-8 lg:gap-y-10 lg:grid lg:grid-cols-7 lg:grid-rows-1 xl:gap-x-16"
>
  <div class="lg:col-span-4 lg:row-end-1">
    <ul class="grid gap-4">
      {#each gallery as src}
        <li>
          <img
            class="rounded"
            {src}
            alt={title}
            decoding="async"
            loading="eager"
            sizes="100vw"
          />
        </li>
      {/each}
    </ul>
  </div>

  <div
    class="mx-auto lg:col-span-3 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 max-w-2xl mt-14 sm:mt-16"
  >
    <div class="sticky top-3">
      <h1 class="text-3xl font-semibold">{title}</h1>

      <p class="text-xl mt-2">{price.toLocaleString("ru-RU") + " руб."}</p>

      {#if currentStockItem}
        <div class="mt-5">
          <AddToCart
            stockItem={currentStockItem}
            cartButtonStyle="primary"
            variant="compact"
          />
        </div>
      {:else}
        <p class="mt-1 text-sm text-grey">
          Чтобы добавить этот товар в корзину выберите один из размеров ниже
        </p>
      {/if}

      <div class="mt-5">
        <h2 class="text-xl font-semibold">Размеры</h2>

        <div
          class="grid grid-cols-4 gap-3 mt-3"
          role="radiogroup"
          aria-labelledby="sizes-label-{product_id}"
        >
          <p id="sizes-label-{product_id}" class="visually-hidden">Выберите размер</p>

          {#each data.stock_items as size (size.id)}
            <input
              id={size.id}
              class="visually-hidden"
              type="radio"
              name="size"
              value={size.id}
              checked={currentStockItem?.id === size.id}
              disabled={size.count === 0}
              on:change={handleChangeSize({ count: size.count, id: size.id, product_id: size.product_id })}
            />
            <label
              class="px-2 py-2 text-s text-center font-medium border border-grey-400 rounded outline-offset-2 cursor-pointer"
              for={size.id}
              title={size.count > 0 ? "Выбрать размер" : "Нет в наличии"}
            >
              {sizeTitle(size)}
            </label>
          {/each}
        </div>
      </div>

      <p class="mt-5">{@html description}</p>
    </div>
  </div>
</div>
