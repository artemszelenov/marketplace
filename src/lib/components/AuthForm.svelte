<script lang="ts">
  import type { SubmitFunction } from "@sveltejs/kit";
  import { enhance } from "$app/forms";
  import { invalidate } from "$app/navigation";

  import Button from "./UI/Button.svelte";

  export let redirectTo = window.location.href;

  let errors: Array<{ message: string }> = [];
  let currentStep: "login" | "registration" = "login";

  const steps = {
    login: {
      title: "Вход",
      submitUrl: "/user?/login",
      submitText: "Войти",
      toggleText: "Зарегистрироваться",
    },
    registration: {
      title: "Регистрация",
      submitUrl: "/user?/register",
      submitText: "Зарегистрироваться",
      toggleText: "Войти",
    },
  };

  function handleToggle() {
    if (currentStep === "login") {
      currentStep = "registration";
    } else if (currentStep === "registration") {
      currentStep = "login";
    }
  }

  const handleFormResult: SubmitFunction = function () {
    return async ({ result }) => {
      if (result.type === "failure") {
        errors = result.data?.errors ?? [];
        return;
      }

      // await applyAction(result);
      invalidate("app:root-layout");
    };
  };
</script>

<form
  method="POST"
  action={steps[currentStep].submitUrl}
  use:enhance={handleFormResult}
>
  <h2 class="text-xl font-semibold">{steps[currentStep].title}</h2>

  {#if errors.length > 0}
    {#each errors as error}
      <p class="text-red">{error.message}</p>
    {/each}
  {/if}

  <input type="hidden" name="redirect-to" value={redirectTo} />

  <div class="mt-3">
    <label for="email" class="block text-sm">Почта *</label>
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
    <label for="password" class="block text-sm">Пароль *</label>
    <input
      class="block w-full mt-1 py-1.5 px-2"
      type="password"
      id="password"
      name="password"
      required
    />
  </div>

  {#if currentStep === "registration"}
    <div class="mt-3">
      <label for="password-confirm" class="block text-sm">
        Пароль еще раз *
      </label>
      <input
        class="block w-full mt-1 py-1.5 px-2"
        type="password"
        id="password-confirm"
        name="password-confirm"
        required
      />
    </div>

    <div class="mt-3">
      <label for="name" class="block text-sm">Имя</label>
      <input
        class="block w-full mt-1 py-1.5 px-2"
        type="text"
        id="name"
        name="name"
        placeholder="Иван"
      />
    </div>
  {/if}

  <div class="flex items-start justify-between mt-6">
    <Button
      title={steps[currentStep].toggleText}
      variant="link"
      extraClasses="underline underline-offset-2"
      onClick={handleToggle}
    >
      {steps[currentStep].toggleText}
    </Button>

    <Button
      title={steps[currentStep].submitText}
      variant="primary"
      type="submit"
    >
      {steps[currentStep].submitText}
    </Button>
  </div>
</form>
