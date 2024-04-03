<script lang="ts">
  import Button from "$lib/components/UI/Button.svelte"
  import Select from "$lib/components/UI/Select.svelte"

  export let products: any[]
  export let current_product: any
  export let current_color_id: string
  export let allowed_colors: any[]
  export let all_size_groups: any[]

  let is_colors_edit = false
  let new_color_dialog: HTMLDialogElement

  function toggleColorsEdit() {
    is_colors_edit = !is_colors_edit
  }

  function showNewColorDialog() {
    new_color_dialog.showModal()
  }

  function closeNewColorDialog() {
    new_color_dialog.close()
  }
</script>

<section>
  <div class="flex justify-between">
    <h3 class="font-bold mb-1">
      Цвета
    </h3>
    <button type="button" on:click={toggleColorsEdit}>
      {is_colors_edit ? "Отменить" : "Редактировать"}
    </button>
  </div>

  <ul class="flex flex-wrap gap-4">
    {#each products as { id, color, stock_items } (color.id)}
      <li>
        {#if is_colors_edit}
          <form action="?/deleteColor" method="post">
            <input type="hidden" name="product_id" value={id}>

            <Button
              type="submit"
              appearance="outlined"
              size="sm"
              additional_class="max-w-max"
            >
              <span slot="text">{color.title}</span>
              <svg slot="icon" height="17" viewBox="0 0 512 512" aria-hidden="true">
                <path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352"/><path d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" />
              </svg>
            </Button>
          </form>
        {:else}
          <a
            href="/supplier/products/{stock_items[0].id}/edit"
            class="tab-link inline-flex items-center text-sm rounded border border-gray-900 px-3 h-[2.5em] cursor-default font-medium"
            class:bg-gray-900={color.id === current_color_id}
            class:text-white={color.id === current_color_id}
          >
            {color.title}
          </a>
        {/if}
      </li>
    {/each}
  </ul>

  {#if is_colors_edit}
    <Button
      size="sm"
      additional_class="max-w-max mt-3"
      no_icon
      handler={showNewColorDialog}
    >
      <span slot="text">Добавить новый цвет</span>
    </Button>
  {/if}

  <dialog bind:this={new_color_dialog}>
    <form action="?/createColor" method="post">
      <input type="hidden" name="title" value={current_product.title}>
      <input type="hidden" name="description" value={current_product.description}>
      <input type="hidden" name="price" value={current_product.price}>
      <input type="hidden" name="group_id" value={current_product.group_id}>

      <label for="color_id" class="block font-bold mb-2">
        Новый цвет
      </label>

      <Select name="color_id">
        {#each allowed_colors as color (color.id)}
          <option value={color.id}>{color.title}</option>
        {/each}
      </Select>

      <label for="size_group_id" class="block font-bold mb-2 mt-5">
        Первый размер для нового цвета
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
          <span slot="text">Добавить</span>
        </Button>
  
        <Button
          appearance="outlined"
          size="sm"
          additional_class="max-w-max"
          no_icon
          handler={closeNewColorDialog}
        >
          <span slot="text">Отмена</span>
        </Button>
      </div>
    </form>
  </dialog>
</section>

<style>
  dialog {
    @apply p-10;
  }
</style>
