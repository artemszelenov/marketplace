<script>
  export let data;
</script>

<div class="flex items-center justify-between">
  <h1 class="text-xl font-semibold">Мои товары</h1>
  <a href="/supplier/products/new">Добавить товар</a>
</div>

<ul class="grid grid-cols-2 md:grid-cols-4 mt-10 gap-4">
  {#each data.items as item}
    <li>
      <a href="/supplier/products/{item.id}/edit">
        <img src={item.image} alt="">
        <p class="mt-3 font-bold">{item.title}</p>
        <p>Размер: {item.size}</p>
        <p>Количество: {item.count}</p>
        {#if item.count <= 2}
          <p class="text-red-700">Осталось мало</p>
        {/if}
      </a>
    </li>
  {/each}
</ul>
