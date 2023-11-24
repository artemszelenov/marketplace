<script lang="ts">
  import AddToCart from "$lib/components/AddToCart.svelte";
  import { cartItems } from "$lib/stores/cart";
  import type { CartItem, StockItem } from "$lib/schema";

  export let data;

  let currentCartItem: CartItem | undefined = $cartItems.find(item => item.product_id === data.product.id);

  function handleChangeSize({ count, id, product_id }: StockItem) {
    console.log(count)
    return () => {
      currentCartItem = { count, id, product_id }
    };
  }

  function sizeTitle({ details, size_group_id }: StockItem) {
    return data.product.type === "shoes"
      ? details[size_group_id][data.user?.preferred_shoe_size_metric.value ?? "eu"].title
      : details[size_group_id].international.title;
  }
</script>

<div
  class="lg:gap-x-8 lg:gap-y-10 lg:grid lg:grid-cols-7 lg:grid-rows-1 xl:gap-x-16"
>
  <div class="lg:col-span-4 lg:row-end-1">
    <ul class="grid gap-4">
      {#each data.product.gallery as src}
        <li>
          <img
            class="aspect-square rounded"
            {src}
            alt={data.product.title}
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
      <h1 class="text-3xl font-semibold">{data.product.title}</h1>

      <p class="text-xl mt-2">{data.product.price.toLocaleString("ru-RU") + " руб."}</p>

      {#if currentCartItem}
        <div class="mt-5">
          <AddToCart
            cartItem={currentCartItem}
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
          aria-labelledby="sizes-label-{data.product.id}"
        >
          <p id="sizes-label-{data.product.id}" class="visually-hidden">Выберите размер</p>

          {#each data.stock_items as size (size.id)}
            <input
              id={size.id}
              class="visually-hidden"
              type="radio"
              name="size"
              value={size.id}
              checked={currentCartItem?.id === size.id}
              disabled={size.count === 0}
              on:change={handleChangeSize(size)}
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

      <div class="mt-5">
        <h2 class="text-xl font-semibold">Другие варианты цветов</h2>

        <ul class="flex mt-3 -mx-2 px-2 space-x-2 overflow-x-auto">
          {#each data.product_variants as variant (variant.id)}
            <li>
              <a href="/catalog/{variant.id}">
                <img
                  class="rounded"
                  width="80"
                  height="80"
                  src={variant.image}
                  alt={variant.title}
                  decoding="async"
                  loading="lazy"
                />
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <p class="mt-5">{@html data.product.description}</p>
    </div>
  </div>
</div>
