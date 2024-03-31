<script lang="ts">
  import Button from "$lib/components/UI/Button.svelte"
  import Select from "$lib/components/UI/Select.svelte"

  export let product: any
  export let current_stock_item_id: string

  let is_sizes_edit = false
  let new_size_dialog: HTMLDialogElement

  function toggleSizesEdit() {
    is_sizes_edit = !is_sizes_edit
  }

  function showNewSizeDialog() {
    new_size_dialog.showModal()
  }

  function closeNewSizeDialog() {
    new_size_dialog.close()
  }
</script>

<div>
  <div class="flex justify-between">
    <h3 class="font-bold mb-1">
      Размеры
    </h3>
    <button type="button" on:click={toggleSizesEdit}>
      {is_sizes_edit ? "Отменить" : "Редактировать"}
    </button>
  </div>

  <ul class="flex flex-wrap gap-4">
    {#each product.stock_items as { id, size_title } (id)}
      <li>
        {#if is_sizes_edit}
          <form action="?/deleteStockItem" method="post">
            <input type="hidden" name="stock_item_id" value={id}>

            <Button
              type="submit"
              appearance="outlined"
              size="sm"
              additional_class="max-w-max"
            >
              <span slot="text">{size_title}</span>
              <svg slot="icon" height="17" viewBox="0 0 512 512" aria-hidden="true">
                <path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352"/><path d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" />
              </svg>
            </Button>
          </form>
        {:else}
          <a
            href="/supplier/products/{id}/edit"
            class="tab-link inline-flex items-center text-sm rounded border border-gray-900 px-3 h-[2.5em] cursor-default font-medium"
            class:bg-gray-900={id === current_stock_item_id}
            class:text-white={id === current_stock_item_id}
          >
            {size_title}
          </a>
        {/if}
      </li>
    {/each}
  </ul>

  {#if is_sizes_edit}
    <Button
      size="sm"
      additional_class="max-w-max mt-3"
      no_icon
      handler={showNewSizeDialog}
    >
      <span slot="text">Добавить новый размер</span>
    </Button>
  {/if}

  <dialog bind:this={new_size_dialog}>
    <form method="post" action="?/createStockItem">
      <input type="hidden" name="product_id" value={product.id}>
  
      <Select name="size_group_id">
        {#each product.allowed_size_groups as size_group (size_group.id)}
          <option value={size_group.id}>{size_group.title}</option>
        {/each}
      </Select>
  
      <div class="mt-5 flex gap-3">
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
          handler={closeNewSizeDialog}
        >
          <span slot="text">Отмена</span>
        </Button>
      </div>
    </form>
  </dialog>
</div>

<style>
  dialog {
    @apply p-10;
  }
</style>
