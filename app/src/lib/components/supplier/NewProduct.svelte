<script lang="ts">
  import Button from "$lib/components/UI/Button.svelte"
  import Select from "$lib/components/UI/Select.svelte"

  export let all_colors: any[]
  export let all_size_groups: any[]

  let new_product_dialog: HTMLDialogElement

  function showNewProductDialog() {
    new_product_dialog.showModal()
  }

  function closeNewProductDialog() {
    new_product_dialog.close()
  }
</script>

<Button
  size="sm"
  handler={showNewProductDialog}
>
  <span slot="text">Создать новый товар</span>
  <svg slot="icon" height="28" viewBox="0 0 512 512" aria-hidden="true">
    <path fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 112v288M400 256H112" />
  </svg>
</Button>

<dialog bind:this={new_product_dialog}>
  <form action="?/createProduct" method="post">
    <label for="title" class="block font-bold mb-2">
      Название нового товара
    </label>
    <input
      type="text"
      name="title"
      id="title"
    >

    <label for="color_id" class="block font-bold mb-2 mt-5">
      Первый цвет для этого товара
    </label>

    <Select name="color_id">
      {#each all_colors as color (color.id)}
        <option value={color.id}>{color.title}</option>
      {/each}
    </Select>

    <label for="size_group_id" class="block font-bold mb-2 mt-5">
      Первый размер для этого цвета
    </label>

    <Select name="size_group_id">
      {#each all_size_groups as size_group (size_group.id)}
        <option value={size_group.id}>{size_group.title}</option>
      {/each}
    </Select>

    <div class="mt-8 flex gap-3">
      <Button
        type="submit"
        size="sm"
        additional_class="max-w-max"
        no_icon
      >
        <span slot="text">Создать</span>
      </Button>

      <Button
        appearance="outlined"
        size="sm"
        additional_class="max-w-max"
        no_icon
        handler={closeNewProductDialog}
      >
        <span slot="text">Отмена</span>
      </Button>
    </div>
  </form>
</dialog>

<style>
  dialog {
    @apply p-10 min-w-[40vmax];
  }
</style>
