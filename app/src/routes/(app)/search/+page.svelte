<script lang="ts">
  import ProductTeaser from "$lib/components/ProductTeaser.svelte"

  export let data
</script>

<h1 class="text-lg">
  Результаты по запросу: 
  <strong class="font-bold">{data.initial_query}</strong>
</h1>

<ul class="grid grid-cols-2 md:grid-cols-4 mt-10 gap-4">
  {#each data.teasers as product (product.id)}
    <li>
      <ProductTeaser {product} />
    </li>
  {/each}
</ul>
