<script>
  import ProductTeaser from "$lib/components/ProductTeaser.svelte"

  export let data
</script>

<h1 class="text-2xl font-bold">Новинки</h1>

<ul class="flex gap-4 mt-7 overflow-auto no-scrollbar">
  {#each data.new_teasers as product (product.id)}
    <li class="w-[70%] md:w-[22%] shrink-0">
      <ProductTeaser {product} />
    </li>
  {/each}
</ul>

<h1 class="text-2xl font-bold mt-8">Мужчины</h1>

<ul class="flex gap-4 mt-7 overflow-auto no-scrollbar">
  {#each data.teasers_men as product (product.id)}
    <li class="w-[70%] md:w-[22%] shrink-0">
      <ProductTeaser {product} />
    </li>
  {/each}
</ul>

<h1 class="text-2xl font-bold mt-8">Женщины</h1>

<ul class="flex gap-4 mt-7 overflow-auto no-scrollbar">
  {#each data.teasers_women as product (product.id)}
    <li class="w-[70%] md:w-[22%] shrink-0">
      <ProductTeaser {product} />
    </li>
  {/each}
</ul>
