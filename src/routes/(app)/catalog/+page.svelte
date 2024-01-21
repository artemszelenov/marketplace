<script lang="ts">
  import ProductTeaser from "$lib/components/ProductTeaser.svelte";

  export let data;

  $: has_more_items = !data.pagination.done;

  $: page = data.pagination.current_page;

  function onApplyFilters() {
    page = 1;
  }

  function onShowMore() {
    page += 1;
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
              >
              <span>{entity.title}</span>
            </label>
          {/each}
        </fieldset>
      {/each}

      <p>
        <input type="reset" value="Сбросить">
        <input type="submit" value="Применить" on:click={onApplyFilters}>
      </p>

      <input type="hidden" name="page" value={page}>
    </form>
  </details>
</section>

<ul class="grid md:grid-cols-2 lg:grid-cols-4 mt-7 gap-4">
  {#each data.teasers as product (product.id)}
    <li>
      <ProductTeaser {product} />
    </li>
  {/each}
</ul>

{#if has_more_items}
  <div class="flex justify-center mt-4">
    <input type="submit" form="filter-form" value="Показать еще {data.pagination.limit}" on:click={onShowMore}>
  </div>
{/if}
