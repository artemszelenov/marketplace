<script>
  import NewProduct from '$lib/components/supplier/NewProduct.svelte';

  export let data;
</script>

<div class="flex items-center justify-between">
  <h1 class="text-xl font-semibold">
    Мои товары
  </h1>

  <NewProduct
    all_size_groups={data.all_size_groups}
    all_colors={data.all_colors}
  />
</div>

<ul class="grid grid-cols-2 md:grid-cols-4 mt-10 gap-4">
  {#each data.items as item}
    <li>
      <a href="/supplier/products/{item.id}/edit">
        <img class="aspect-square object-cover rounded" src={item.image} alt="">
        <p class="mt-3 font-bold">{item.title}</p>
        <p>Размер: {item.size}</p>
        <p>Количество: {item.count}</p>
        {#if item.count <= 2}
          <p class="text-red-700">Осталось мало</p>
        {/if}
        {#if item.on_moderation}
          <p class="text-yellow-500">На модерации</p>
        {/if}
      </a>
    </li>
  {/each}
</ul>
