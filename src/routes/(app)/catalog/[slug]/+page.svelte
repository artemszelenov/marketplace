<script lang="ts">
  import AddToCartForm from "$lib/components/forms/AddToCartForm.svelte";
  import { SHOES_METRICS, preferredShoesSizeMetric } from "$lib/stores/preferredShoesSizeMetric";
  import type { StockItem } from "$lib/schema";

  export let data;

  $: current_stock_item = data.stock_items.find(
    stock_item => stock_item.id === data.current_stock_item_id
  );

  function getSizeTitleFrom(stock_item: StockItem) {
    return data.product.type === "shoes"
      ? stock_item.metrics[$preferredShoesSizeMetric]
      : stock_item.metrics.intl
  }
</script>

<div
  class="md:gap-x-8 md:gap-y-10 md:grid md:grid-cols-7 md:grid-rows-1 xl:gap-x-16"
>
  <div class="md:col-span-4 md:row-end-1">
    <ul class="flex overflow-auto md:grid gap-4">
      {#each data.product.gallery as src}
        <li class="w-[80%] md:w-auto shrink-0">
          <img
            class="aspect-square rounded-2xl"
            height="400"
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
      <h1 class="text-xl md:text-3xl uppercase text-gray-900 font-bold">{data.product.title}</h1>

      <p class="text-lg font-medium text-gray-900 mt-2">{data.product.price.toLocaleString("ru-RU") + " ₽"}</p>

      <div class="mt-4">
        <AddToCartForm
          stock_item_id={current_stock_item?.id}
        />
      </div>

      {#if !current_stock_item}
        <p class="mt-2 text-sm text-gray-900">
          Выберите один из размеров ниже
        </p>
      {/if}

      <div class="mt-7">
        {#if data.product.type === "shoes"}
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-gray-900">Размеры</h2>

            <ul class="flex items-center">
              {#each SHOES_METRICS as metric, index}
                <li>
                  <button
                    class="text-gray-900 text-xs px-1.5 font-bold border border-gray-900"
                    class:rounded-l-full={index === 0}
                    class:pl-2={index === 0}
                    class:rounded-r-full={SHOES_METRICS.length - 1 === index}
                    class:pr-2={SHOES_METRICS.length - 1 === index}
                    class:ml-[-1px]={SHOES_METRICS.length - 1 !== index && index !== 0}
                    class:mr-[-1px]={SHOES_METRICS.length - 1 !== index && index !== 0}
                    type="button"
                    on:click={() => preferredShoesSizeMetric.set(metric)}
                  >
                    {metric.toUpperCase()}
                  </button>
                </li>
              {/each}
            </ul>
          </div>
        {:else}
          <h2 class="text-xl font-bold text-gray-900">Размеры</h2>
        {/if}

        <nav class="grid grid-cols-4 md:grid-cols-5 gap-3 mt-3">
          {#each data.stock_items as stock_item (stock_item.id)}
            {#if stock_item.count > 0}
              <a
                href="/catalog/{stock_item.product_id}?stock_item={stock_item.id}"
                class="inline-flex items-center justify-center text-sm rounded border border-gray-900 px-3 h-[2.5em] cursor-default font-medium"
                class:bg-gray-900={current_stock_item?.id === stock_item.id}
                class:text-white={current_stock_item?.id === stock_item.id}
              >
                {getSizeTitleFrom(stock_item)}
              </a>
            {:else}
              <div
                class="px-2 py-1.5 text-s text-center font-medium border-2 border-grey-400 rounded outline-offset-2 cursor-not-allowed opacity-30"
                title="Нет в наличии"
              >
                {getSizeTitleFrom(stock_item)}
              </div>
            {/if}
          {/each}
        </nav>
      </div>

      {#if data.product_variants.length > 0}
        <div class="mt-5">
          <h2 class="text-xl font-bold text-gray-900">Цвета</h2>

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
      {/if}

      <p class="mt-5">{@html data.product.description}</p>
    </div>
  </div>
</div>
