<script lang="ts">
  import Button from "$lib/components/UI/Button.svelte";
  import Editor from "$lib/components/UI/Editor.svelte";
  import SizesEdit from "$lib/components/supplier/SizesEdit.svelte";
  import PhotosEdit from "$lib/components/supplier/PhotosEdit.svelte";
  import ColorsEdit from "$lib/components/supplier/ColorsEdit.svelte";

  export let data;

  $: current_product_id = data.current_product_id;
  $: current_color_id = data.current_color_id;
  $: current_stock_item_id = data.current_stock_item_id;

  $: product = data.products.find(product => product.id === current_product_id)!;

  $: current_stock_item = product.stock_items.find((stock_item: any) => stock_item.id === current_stock_item_id)!;  
</script>

<h1 class="text-xl font-semibold">{product.title}</h1>

<form action="?/updateTexts" method="post" class="grid grid-cols-2 gap-10 mt-6">
  <input type="hidden" name="product_id" value={product.id}>
  <input type="hidden" name="stock_item_id" value={current_stock_item.id}>

  <section class="grid gap-10 auto-rows-max">
    <div>
      <label for="title" class="block font-bold mb-2">Заголовок</label>
      <input
        type="text"
        name="title"
        id="title"
        value={product.title}
      >
    </div>

    <div>
      <label for="price" class="block font-bold mb-2">Цена</label>
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

    <div>
      <label for="description" class="block font-bold mb-2">Описание</label>
      <Editor content={product.description} />
    </div>

    <div>
      <label for="sku" class="block font-bold mb-2">Артикул</label>
      <input
        type="text"
        name="sku"
        id="sku"
        value={data.sku}
      >
    </div>
  </section>
  
  <section class="grid gap-10 auto-rows-max">
    <ColorsEdit
      current_product={product}
      products={data.products}
      allowed_colors={data.allowed_colors}
      all_size_groups={data.all_size_groups}
      {current_color_id}
    />

    <PhotosEdit {product} />

    <SizesEdit {product} {current_stock_item_id} />

    <div>
      <label for="count" class="block font-bold mb-2">Количество</label>
      <input
        type="number"
        name="count"
        id="count"
        value={current_stock_item.count}
      >
    </div>

    <Button
      type="submit"
      additional_class="max-w-max"
      no_icon
    >
      <span slot="text">Сохранить</span>
    </Button>
  </section>
</form>
