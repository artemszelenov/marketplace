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
  <button type="submit" title="Добавить в корзину">Добавить в корзину</button>
</form>

{#if errors.length > 0}
  {#each errors as message}
    <p class="text-red">{message}</p>
  {/each}
{/if}
