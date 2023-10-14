<script lang="ts">
  import Button from "./UI/Button.svelte";

  let currentStep: "login" | "registration" = "login";

  const steps = {
    login: {
      title: "Вход",
      submitUrl: "?/login",
      submitText: "Войти",
      toggleText: "Еще не регистрировались?",
    },
    registration: {
      title: "Регистрация",
      submitUrl: "?/register",
      submitText: "Зарегистрироваться",
      toggleText: "Вернуться ко входу",
    },
  };

  async function handleSubmit(e: SubmitEvent) {
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const res = await fetch(steps[currentStep].submitUrl, {
      method: "POST",
      body: formData,
    });
    const { message } = await res.json();
  }

  function handleToggle() {
    if (currentStep === "login") {
      currentStep = "registration";
      return;
    }

    if (currentStep === "registration") {
      currentStep = "login";
      return;
    }
  }
</script>

<form
  class="w-[25em]"
  action={steps[currentStep].submitUrl}
  method="POST"
  on:submit|preventDefault={handleSubmit}
>
  <p>Вам нужно зарегистрироваться или войти, чтобы продолжить</p>

  <h2 class="mt-5 text-xl font-semibold">{steps[currentStep].title}</h2>

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
