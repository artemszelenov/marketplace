<script>
  import AddToCart from "$lib/components/AddToCart.svelte";

  export let data;

  const { title, description, gallery, price } = data.product;
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
      <p class="text-xl mt-2">{price}</p>
      <div class="mt-5">
        <AddToCart
          product={data.product}
          cartButtonStyle="primary"
          variant="compact"
        />
      </div>
      <p class="mt-5">{description}</p>
    </div>
  </div>
</div>
