<script lang="ts">
  import type { SubmitFunction } from "@sveltejs/kit";
  import { invalidate } from '$app/navigation';
  import { enhance } from "$app/forms";
  import Button from "$lib/components/UI/Button.svelte";

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

  <Button
    title="Добавить в корзину"
    disabled={!stock_item_id}
    type="submit"
    size="xs"
  >
    <span slot="text">Добавить в корзину</span>
  </Button>
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
