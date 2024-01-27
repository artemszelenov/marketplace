<script lang="ts">
  import ProductTeaser from "$lib/components/ProductTeaser.svelte";
  import { page } from '$app/stores';

  export let data;

  $: has_more_items = !data.pagination.done;

  $: next_page = data.pagination.current_page;

  $: search_values = Array.from($page.url.searchParams.values());

  let prev_teasers: typeof data.teasers = [];

  $: teasers = prev_teasers.concat(data.teasers);

  function reset() {
    prev_teasers = [];
    next_page = 1;
  }

  function loadMore() {
    prev_teasers.push(...data.teasers);
    next_page += 1;
  }
</script>

<section class="mt-12">
  <details>
    <summary>
      Фильтры
    </summary>

    <form id="filter-form" action="/catalog" data-sveltekit-noscroll>
      {#each Object.keys(data.filters) as filters_group_key}
        <fieldset>
          <legend>{data.filters[filters_group_key].title}</legend>

          {#each data.filters[filters_group_key].values as entity}
            <label>
              <input
                type="checkbox"
                name={filters_group_key}
                value={entity.value}
                checked={search_values.includes(entity.value)}
              >
              <span>{entity.title}</span>
            </label>
          {/each}
        </fieldset>
      {/each}

      <p>
        <input type="reset" value="Сбросить">
        <input type="submit" value="Применить" on:click={reset}>
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

<div class="mt-4">
  <p>Страница {next_page}</p>

  <!-- {#if current_page > 1} -->
    <input
      type="submit"
      form="filter-form"
      value="Вернуться к началу"
      on:click={reset}>
  <!-- {/if} -->
</div>

{#if has_more_items}
  <div class="flex justify-center mt-4">
    <input
      type="submit"
      form="filter-form"
      value="Показать еще {data.pagination.limit}"
      on:click={loadMore}
    >
  </div>
{/if}
