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
    requestAnimationFrame(() => window.scrollTo(0, 0));
  }

  function loadMore() {
    prev_teasers.push(...data.teasers);
    next_page += 1;
  }
</script>

<form action="/search" class="grid">
    <input name="q" placeholder="Search" class="row-start-1 col-start-1">

  <div class="relative row-start-1 col-start-1 right-3 justify-self-end self-center">
    <Button
      type="submit"
      title="Search"
    >
      <svg slot="icon" height="17" viewBox="0 0 512 512" aria-label="Search">
        <path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" fill="none" stroke="currentcolor" stroke-miterlimit="10" stroke-width="32" />
        <path fill="none" stroke="currentcolor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M338.29 338.29L448 448" />
      </svg>
    </Button>
  </div>
</form>

<section class="grid grid-cols-2 mt-8 md:mt-12">
  <h1 class="col-start-1 row-start-1 text-2xl font-bold">
      All products
  </h1>

  <details class="col-start-1 row-start-1 col-end-3">
    <summary class="max-w-max ml-auto rounded-full">
      <Button as="div">
        <span slot="text">Filters</span>
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
      class="mt-8 ml-auto"
      data-sveltekit-noscroll
    >
      {#each Object.keys(data.filters) as filters_group_key}
        <fieldset class="flex gap-2 flex-wrap mt-6">
          <legend class="uppercase font-bold mb-3">
            {data.filters[filters_group_key].title}
          </legend>

          {#each data.filters[filters_group_key].values as entity}
            <label>
              <input
                type="checkbox"
                name={filters_group_key}
                value={entity.value}
                checked={search_values.includes(entity.value)}
                class="sr-only peer"
              >
              <span
                class="
                  peer-[:hover:not(:checked)]:bg-neutral-200 peer-checked:bg-gray-900 peer-checked:text-white
                  inline-flex items-center text-sm font-medium
                  rounded border border-gray-900 px-3 h-[2.5em]
                  cursor-default"
              >
                {entity.title}
              </span>
            </label>
          {/each}
        </fieldset>
      {/each}

      <p class="flex justify-between md:justify-end gap-8 mt-8">
        <input
          type="reset"
          value="Reset all"
          class="underline underline-offset-[0.2em]"
        >

        <Button
          type="submit"
          handler={reset}
        >
          <span slot="text">Apply</span>
        </Button>
      </p>

      <input type="hidden" name="page" value={next_page}>
    </form>
  </details>
</section>

<ul class="grid grid-cols-2 md:grid-cols-4 mt-10 gap-4">
  {#each teasers as product (product.id)}
    <li>
      <ProductTeaser {product} />
    </li>
  {/each}
</ul>

<div class="flex gap-4 my-10">
  <Button
    type="submit"
    form="filter-form"
    title="Return to top"
    handler={goTop}
    additional_class="mr-auto"
  >
    <svg slot="icon" height="18" viewBox="0 0 512 512" aria-hidden="true">
      <path fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M112 244l144-144 144 144M256 120v292" />
    </svg>
  </Button>

  {#if has_more_items}
    <Button
      type="submit"
      form="filter-form"
      title={`Show ${data.pagination.limit} more`}
      handler={loadMore}
    >
      <span slot="text">Show {data.pagination.limit} more</span>
      <svg slot="icon" height="18" viewBox="0 0 512 512" class="rotate-180" aria-hidden="true">
        <path fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M112 244l144-144 144 144M256 120v292" />
      </svg>
    </Button>
  {/if}

  <Button
    as="div"
    appearance="outlined"
  >
    <span slot="icon">{next_page}</span>
  </Button>
</div>
