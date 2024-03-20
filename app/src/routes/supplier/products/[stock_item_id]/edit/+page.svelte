<script lang="ts">
  import Button from "$lib/components/UI/Button.svelte";

  export let data;

  $: current_product_id = data.current_product_id;
  $: current_color_id = data.current_color_id;
  $: current_stock_item_id = data.current_stock_item_id;

  $: product = data.products.find(product => product.id === current_product_id)!;

  $: current_stock_item = product.stock_items.find((stock_item: any) => stock_item.id === current_stock_item_id)!;
</script>

<h1 class="text-xl font-semibold">{product.title}</h1>

<form class="grid grid-cols-2 gap-10 mt-6" enctype="multipart/form-data">
  <section class="grid gap-5">
    <div>
      <label for="title">Заголовок</label>
      <input
        type="text"
        name="title"
        id="title"
        value={product.title}
      >
    </div>

    <div>
      <label for="description">Описание</label>
      <textarea
        name="description"
        id="description"
      >
        {product.description}
      </textarea>
    </div>
  
    <div>
      <label for="price">Цена</label>
      <input
        type="text"
        inputmode="numeric"
        pattern="[0-9]*"
        name="price"
        id="price"
        value={product.price}
        required
      >
    </div>
  </section>
  
  <section>
    <p>Цвета</p>
    <ul class="flex p-1 -mx-1 space-x-1 overflow-x-auto">
      {#each data.products as { color, stock_items } (color.id)}
        <li>
          <a
            href="/supplier/products/{stock_items[0].id}/edit"
            class="inline-flex items-center text-sm rounded border border-gray-900 px-3 h-[2.5em] cursor-default font-medium"
            class:bg-gray-900={color.id === current_color_id}
            class:text-white={color.id === current_color_id}
          >
            {color.title}
          </a>
        </li>
      {/each}
    </ul>

    <p>Фото</p>
    <ul class="flex p-1 -mx-1 space-x-1 overflow-x-auto">
      {#each product.gallery as thumbnail}
        <li class="shrink-0 w-[20%]">
          <img
            class="w-full aspect-square rounded object-cover"
            src={thumbnail}
            alt=""
            width="100"
            height="100"
            decoding="async"
            loading="lazy"
          />
        </li>
      {/each}
    </ul>

    <p>Размеры</p>
    <ul class="flex p-1 -mx-1 space-x-1 overflow-x-auto">
      {#each product.stock_items as { id, size_title } (id)}
        <li>
          <a
            href="/supplier/products/{id}/edit"
            class="inline-flex items-center text-sm rounded border border-gray-900 px-3 h-[2.5em] cursor-default font-medium"
            class:bg-gray-900={id === current_stock_item_id}
            class:text-white={id === current_stock_item_id}
          >
            {size_title}
          </a>
        </li>
      {/each}
    </ul>

    <div>
      <label for="count">Количество</label>
      <input
        type="number"
        name="count"
        id="count"
        value={current_stock_item.count}
      >
    </div>
  </section>

  <Button
    type="submit"
    size="sm"
    no_icon
  >
    <span slot="text">Сохранить</span>
  </Button>
</form>
