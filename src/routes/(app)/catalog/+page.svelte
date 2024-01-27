<script lang="ts">
  import ProductTeaser from "$lib/components/ProductTeaser.svelte";
  import { page } from '$app/stores';
  import Button from "$lib/components/UI/Button.svelte";

  export let data;

  $: has_more_items = !data.pagination.done;
  $: next_page = data.pagination.current_page;

  $: search_values = Array.from($page.url.searchParams.values());
  $: applied_filters_count = search_values.filter(val => !Number(val)).length; // filters except page

  let prev_teasers: typeof data.teasers = [];
  $: teasers = prev_teasers.concat(data.teasers);

  function reset() {
    prev_teasers = [];
    next_page = 1;
  }

  function goTop() {
    reset()
    scrollTo(0, 0);
  }

  function loadMore() {
    prev_teasers.push(...data.teasers);
    next_page += 1;
  }
</script>

<section class="mt-12">
  <details>
    <summary class="max-w-max">
      <Button
        as="div"
        size="xs"
      >
        <span slot="text">Фильтры</span>
        <span slot="icon">
          {#if applied_filters_count > 0}
            <span>{applied_filters_count}</span>
          {:else}
            <svg height="15" viewBox="0 0 512 512" aria-hidden="true">
              <path fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="50" d="M32 144h448M112 256h288M208 368h96" />
            </svg>
          {/if}
        </span>
      </Button>
    </summary>

    <form
      id="filter-form"
      action="/catalog"
      class="mt-8 max-w-lg"
      data-sveltekit-noscroll
    >
      {#each Object.keys(data.filters) as filters_group_key}
        <fieldset class="flex gap-2 flex-wrap mt-4">
          <legend class="uppercase font-bold mb-2">
            {data.filters[filters_group_key].title}
          </legend>

          {#each data.filters[filters_group_key].values as entity}
            <label>
              <input
                type="checkbox"
                name={filters_group_key}
                value={entity.value}
                checked={search_values.includes(entity.value)}
                class="sr-only"
              >
              <span
                class="inline-flex items-center text-sm rounded border border-gray-900 px-3 h-[2.5em] cursor-default"
              >
                {entity.title}
              </span>
            </label>
          {/each}
        </fieldset>
      {/each}

      <p class="flex justify-between gap-4 mt-8">
        <input
          type="reset"
          value="Сбросить все"
          class="underline"
        >

        <Button
          type="submit"
          size="xs"
          handler={reset}
        >
          <span slot="text">Применить</span>
        </Button>
      </p>

      <input type="hidden" name="page" value={next_page}>
    </form>
  </details>
</section>

<ul class="grid md:grid-cols-2 lg:grid-cols-4 mt-7 gap-4">
  {#each teasers as product (product.id)}
    <li>
      <ProductTeaser {product} />
    </li>
  {/each}
</ul>

<div class="flex flex-col items-end gap-2 mt-4">
  <Button
    as="div"
    size="xs"
    appearance="outlined"
  >
    <span slot="text">Страница</span>
    <span slot="icon">{next_page}</span>
  </Button>

  <Button
    type="submit"
    form="filter-form"
    size="xs"
    title="Вернуться к началу"
    handler={goTop}
  >
    <span slot="text">Вернуться к началу</span>
    <svg slot="icon" height="18" viewBox="0 0 512 512" aria-hidden="true">
      <path fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M112 244l144-144 144 144M256 120v292" />
    </svg>
  </Button>

  {#if has_more_items}
    <Button
      type="submit"
      form="filter-form"
      size="xs"
      title={`Показать еще ${data.pagination.limit}`}
      handler={loadMore}
    >
      <span slot="text">Показать еще {data.pagination.limit}</span>
      <svg slot="icon" height="18" viewBox="0 0 512 512" class="rotate-180" aria-hidden="true">
        <path fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M112 244l144-144 144 144M256 120v292" />
      </svg>
    </Button>
  {/if}
</div>

<style>
  #filter-form [type="checkbox"]:checked + * {
    @apply bg-gray-900 text-white;
  }
</style>
