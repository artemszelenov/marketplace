<script lang="ts">
  import type { SubmitFunction } from "@sveltejs/kit";
  import { enhance } from "$app/forms";
  import { invalidate } from "$app/navigation";

  import Button from "$lib/components/UI/Button.svelte";

  export let redirectTo = "/supplier/products";

  let errors: Array<{ message: string }> = [];

  const handleFormResult: SubmitFunction = function () {
    return async ({ result }) => {
      if (result.type === "failure") {
        errors = result.data?.errors ?? [];
        return;
      }

      // await applyAction(result);
      invalidate("supplier:root");
    };
  };
</script>

<form
  method="POST"
  action="/user?/login"
  use:enhance={handleFormResult}
>
  <h2 class="text-xl font-semibold">Вход</h2>

  {#if errors.length > 0}
    {#each errors as error}
      <p class="text-red">{error.message}</p>
    {/each}
  {/if}

  <input type="hidden" name="redirect-to" value={redirectTo} />

  <div class="mt-3">
    <label for="email" class="block text-sm">Почта</label>
    <input
      class="block w-full mt-1 py-1.5 px-2"
      type="email"
      id="email"
      name="email"
      placeholder="example@gmail.com"
      required
    />
  </div>

  <div class="mt-3">
    <label for="password" class="block text-sm">Пароль</label>
    <input
      class="block w-full mt-1 py-1.5 px-2"
      type="password"
      id="password"
      name="password"
      required
    />
  </div>

  <div class="flex items-start justify-between mt-6">
    <Button type="submit" size="sm">
      Войти
    </Button>
  </div>
</form>