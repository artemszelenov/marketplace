<script>
  import ProductTeaser from "$lib/components/ProductTeaser.svelte";

  export let data;

  const { products } = data;
</script>

<section>
  <div class="px-8 py-12 mx-auto max-w-7xl md:px-12">
    <ul class="grid md:grid-cols-2 lg:grid-cols-4 mt-12 gap-4">
      {#each products as product}
        <li>
          <ProductTeaser {product} />
        </li>
      {/each}
    </ul>
  </div>
</section>
