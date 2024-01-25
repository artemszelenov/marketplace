<script lang="ts">
  import ProductTeaser from "$lib/components/ProductTeaser.svelte";
  import { page } from '$app/stores';

  export let data;

  $: has_more_items = !data.pagination.done;

  $: current_page = data.pagination.current_page;

  $: search_values = [...$page.url.searchParams.values()];
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
        <input type="submit" value="Применить" on:click={() => { current_page = 1 }}>
      </p>

      <input type="hidden" name="page" value={current_page}>
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

<div class="mt-4">
  <p>Страница {current_page}</p>

  <!-- {#if current_page > 1} -->
    <input
      type="submit"
      form="filter-form"
      value="Вернуться к началу"
      on:click={() => { current_page = 1 }}>
  <!-- {/if} -->
</div>

{#if has_more_items}
  <div class="flex justify-center mt-4">
    <input
      type="submit"
      form="filter-form"
      value="Показать еще {data.pagination.limit}"
      on:click={() => { current_page += 1 }}
    >
  </div>
{/if}
