<script lang="ts">
  import type { Size } from "$lib/stores/cart";

  import AddToCart from "$lib/components/AddToCart.svelte";

  export let data;

  const { title, description, gallery, price, sizes } = data.product;

  let currentSize: Size | undefined = undefined;

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
        {#each sizes as size (size.value.id)}
          <label class="inline-flex items-center" for={size.value.id}>
            {size.value[data.user?.shoeSizeMetric ?? "eu"]}
          </label>
          <input
            id={size.value.id}
            type="radio"
            name="size"
            value={size.value.id}
            disabled={!size.inStockCount}
            on:change={handleChangeSize(size)}
          />
        {/each}
      </div>
      <p class="mt-5">{description}</p>
    </div>
  </div>
</div>
