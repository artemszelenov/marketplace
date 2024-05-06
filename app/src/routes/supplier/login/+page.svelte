<script lang="ts">
  import type { SubmitFunction } from "@sveltejs/kit";
  import { enhance, applyAction } from "$app/forms";

  import Button from "$lib/components/UI/Button.svelte";

  let errors: Array<{ message: string }> = [];

  const handleFormResult: SubmitFunction = function () {
    return async ({ result }) => {
      if (result.type === "failure") {
        errors = result.data?.errors ?? [];
        return;
      }

      await applyAction(result);
    };
  };
</script>

<form
  method="POST"
  action="/user?/login"
  use:enhance={handleFormResult}
  class="max-w-[400px]"
>
  <h2 class="text-xl font-semibold">Вход</h2>

  {#if errors.length > 0}
    {#each errors as error}
      <p class="text-red mt-10">{error.message}</p>
    {/each}
  {/if}

  <input type="hidden" name="redirect-to" value="/supplier/products" />

  <div class="grid grid-cols-[100px_1fr] gap-4 items-center mt-10">
    <label for="email" class="block text-sm">Почта</label>
    <input
      class="block w-full mt-1 py-1.5 px-2"
      type="email"
      id="email"
      name="email"
      placeholder="example@gmail.com"
      required
    />
  
    <label for="password" class="block text-sm">Пароль</label>
    <input
      class="block w-full mt-1 py-1.5 px-2"
      type="password"
      id="password"
      name="password"
      required
    />
  </div>

  <div class="flex items-start justify-between mt-10">
    <Button type="submit" no_icon>
      <span slot="text">Войти</span>
    </Button>
  </div>
</form>