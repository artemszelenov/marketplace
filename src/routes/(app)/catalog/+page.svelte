<script lang="ts">
  import { enhance } from "$app/forms";
  import ProductTeaser from "$lib/components/ProductTeaser.svelte";
  import LoadMoreForm from "$lib/components/forms/LoadMoreForm.svelte";

  export let data;
  export let form;

  $: teasers = [...data.teasers, ...(form?.teasers || [])];

  $: pagination = form?.pagination || data.pagination;
  $: has_more_items = !pagination.done;
</script>

<section class="mt-12">
  <details>
    <summary>
      Фильтры
    </summary>

    <form action="?/filter" method="POST" use:enhance>
      {#each Object.keys(data.filters) as filters_group_key}
        <fieldset>
          <legend>{data.filters[filters_group_key].title}</legend>

          {#each data.filters[filters_group_key].values as entity}
            <label>
              <input
                type="checkbox"
                name={filters_group_key}
                value={entity.value}
                checked={form?.checked_filters?.includes(entity.value)}
              >
              <span>{entity.title}</span>
            </label>
          {/each}
        </fieldset>
      {/each}

      <p>
        <input type="reset" value="Сбросить">
        <input type="submit" value="Применить">
      </p>
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

{#if has_more_items}
  <div class="flex justify-center mt-4">
    <LoadMoreForm {pagination} />
  </div>
{/if}
