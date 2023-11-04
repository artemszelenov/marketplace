<script lang="ts">
  import type { Size } from "$lib/stores/cart";

  import AddToCart from "$lib/components/AddToCart.svelte";
  import { cartItems, addOne, removeOne, createID } from "$lib/stores/cart";

  export let data;

  const { title, description, gallery, price, sizes, id } = data.product;

  let currentSize: Size | undefined = undefined;
  const productInCart = $cartItems.find((item) => item.id.split(":")[0] === id);

  if (productInCart) {
    currentSize = sizes.find(
      (size) => size.value.id === productInCart.id.split(":")[1]
    );
  }

  function handleChangeSize(sizePayload: Size) {
    return () => {
      currentSize = sizePayload;
    };
  }
</script>

<div
  class="lg:gap-x-8 lg:gap-y-10 lg:grid lg:grid-cols-7 lg:grid-rows-1 xl:gap-x-16"
>
  <div class="lg:col-span-4 lg:row-end-1">
    <ul class="grid gap-4">
      {#each gallery as { src, width, height, alt, srcset }}
        <li>
          <img
            class="rounded"
            {src}
            {alt}
            {width}
            {height}
            {srcset}
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

      <div class="mt-5">
        <AddToCart
          product={data.product}
          size={currentSize}
          cartButtonStyle="primary"
          variant="compact"
        />
      </div>

      <div class="mt-5">
        <h2 class="text-xl font-semibold">Размеры</h2>

        <div
          class="grid grid-cols-4 gap-3 mt-3"
          role="radiogroup"
          aria-labelledby="sizes-label-{id}"
        >
          <p id="sizes-label-{id}" class="visually-hidden">Выберите размер</p>

          {#each sizes as size (size.value.id)}
            <input
              id={size.value.id}
              class="visually-hidden"
              type="radio"
              name="size"
              value={size.value.id}
              checked={!!currentSize}
              disabled={!size.inStockCount}
              on:change={handleChangeSize(size)}
            />
            <label
              class="px-2 py-2 text-s text-center font-medium border border-grey-400 rounded outline-offset-2 cursor-pointer"
              for={size.value.id}
            >
              {size.value[data.user?.shoeSizeMetric ?? "eu"]}
            </label>
          {/each}
        </div>
      </div>

      <p class="mt-5">{description}</p>
    </div>
  </div>
</div>
