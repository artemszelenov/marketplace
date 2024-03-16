<script lang="ts">
  import AddToCartForm from "$lib/components/forms/AddToCartForm.svelte";
  import Select from "$lib/components/UI/Select.svelte";
  import { SHOES_METRICS, preferredShoesSizeMetric } from "$lib/stores/preferredShoesSizeMetric";
  import type { StockItem, StoragePreferredShoesSizeMetric } from "$lib/schema";

  export let data;

  $: current_stock_item = data.stock_items.find(
    stock_item => stock_item.id === data.current_stock_item_id
  );

  function getSizeTitleOf(stock_item: StockItem) {
    return data.product.type === "shoes"
      ? stock_item.metrics[$preferredShoesSizeMetric]
      : stock_item.metrics.intl
  }

  function changeMetric(event: Event) {
    const value = (event.target as HTMLSelectElement).value as StoragePreferredShoesSizeMetric;
    preferredShoesSizeMetric.set(value);
  }
</script>

<div class="md:gap-10 md:grid md:grid-cols-[1fr_28rem] pb-10">
  <ul class="flex overflow-auto md:grid gap-3">
    {#each data.product.gallery as src}
      <li class="w-[80%] md:w-auto shrink-0">
        <img
          class="rounded-2xl w-full"
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

  <div class="mt-10 md:mt-0">
    <div class="sticky top-3">
      <h1 class="text-xl md:text-3xl uppercase text-gray-900 font-bold">
        {data.product.title}
      </h1>

      <p class="text-lg font-medium text-gray-900 mt-2">
        {data.product.price.toLocaleString("ru-RU") + " ₽"}
      </p>

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

      <div class="mt-10">
        {#if data.product.type === "shoes"}
          <div class="flex items-center gap-4 justify-between">
            <h2 class="text-xl font-bold text-gray-900">Размеры</h2>

            <Select
              name="shoes-size-metric"
              onChange={changeMetric}
              value={$preferredShoesSizeMetric}
            >
              {#each SHOES_METRICS as metric}
                <option value={metric}>
                  {metric.toUpperCase()}
                </option>
              {/each}
            </Select>
          </div>
        {:else}
          <h2 class="text-xl font-bold text-gray-900">Размеры</h2>
        {/if}

        <nav class="grid grid-cols-4 md:grid-cols-5 gap-4 mt-4">
          {#key $preferredShoesSizeMetric}
            {#each data.stock_items as stock_item (stock_item.id)}
              {#if stock_item.count > 0}
                <a
                  href="/catalog/{stock_item.product_id}?stock_item={stock_item.id}"
                  class="inline-flex items-center justify-center text-sm rounded border border-gray-900 h-[2.5em] cursor-default font-medium"
                  class:active={current_stock_item?.id === stock_item.id}
                >
                  {getSizeTitleOf(stock_item)}
                </a>
              {:else}
                <div
                  class="py-1.5 text-s text-center font-medium border-2 border-grey-400 rounded outline-offset-2 cursor-not-allowed opacity-30"
                  title="Нет в наличии"
                >
                  {getSizeTitleOf(stock_item)}
                </div>
              {/if}
            {/each}
          {/key}
        </nav>
      </div>

      {#if data.product_variants.length > 0}
        <div class="mt-10">
          <h2 class="text-xl font-bold text-gray-900">Цвета</h2>

          <ul class="flex mt-4 -mx-2 px-2 space-x-2 overflow-x-auto">
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

      <p class="description mt-10">{@html data.product.description}</p>
    </div>
  </div>
</div>

<style>
  .description > p + p {
    @apply mt-4;
  }
</style>
