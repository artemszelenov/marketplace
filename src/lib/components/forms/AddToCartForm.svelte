<script lang="ts">
  import type { SubmitFunction } from "@sveltejs/kit";
  import { invalidate } from '$app/navigation';
  import { enhance } from "$app/forms";

  export let stock_item_id: string | undefined;

  let feedback: { type: 'error' | 'success', message: string };

  const handleFormResult: SubmitFunction = function () {
    return async ({ result }) => {
      if (result.type === "failure") {
        feedback = { type: 'error', message: result.data?.message }
      }

      if (result.type === "success") {
        feedback = { type: 'success', message: result.data?.message }
        invalidate("layout:root");
      }
    };
  };
</script>

<form action="/cart?/add" method="POST" use:enhance={handleFormResult}>
  <input type="hidden" name="stock-item" value={stock_item_id}>

  <input type="hidden" name="quantity" value="1">

  <button
    class="flex items-center gap-2 text-white text-xs uppercase"
    type="submit"
    title="Добавить в корзину"
    disabled={!stock_item_id}
  >
    <div class="bg-gray-900 rounded-full px-5 py-2 tracking-wide">
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

{#if feedback}
  <p
    class="mt-1"
    class:text-teal-800={feedback.type === "success"}
    class:text-red-700={feedback.type === "error"}
  >
    {feedback.message}
  </p>
{/if}
