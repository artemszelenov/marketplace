<script lang="ts">
  import type { SubmitFunction } from "@sveltejs/kit";
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";

  export let stock_item_id: string;

  let errors: string[] = [];

  const handleFormResult: SubmitFunction = function () {
    return async ({ result }) => {
      if (result.type === "failure") {
        errors = result.data?.errors ?? [];
      }
    };
  };
</script>

<form action="/cart?/add" method="POST" use:enhance={handleFormResult}>
  <input type="hidden" name="stock-item" value={stock_item_id}>
  <input type="hidden" name="quantity" value="1">
  <input type="hidden" name="from" value={$page.url.pathname + $page.url.search}>
  <button
    class="flex items-center gap-2 text-white text-xs uppercase"
    type="submit"
    title="Добавить в корзину"
  >
    <div
      class="bg-gray-900 rounded-full px-5 py-2 tracking-wide"
    >
      Добавить в корзину
    </div>
    <div
      class="flex items-center justify-center rounded-full bg-gray-900 w-[32px] h-[32px]"
    >
      <svg class="w-4 h-4" width="21" height="20" viewBox="0 0 21 20" fill="none" aria-hidden="true">
        <path d="M10.5 1.80627V18.9938M19.0938 10.4H1.90625" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>        
    </div>
  </button>
</form>

{#if errors.length > 0}
  {#each errors as message}
    <p class="text-red">{message}</p>
  {/each}
{/if}
