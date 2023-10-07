<script lang="ts">
  import Button from "./UI/Button.svelte";

  let currentStep: "login" | "registration" = "login";
  let responseMessage;

  const steps = {
    login: {
      title: "Вход",
      submitText: "Войти",
      onSubmit: handleLogin,
      toggleText: "Еще не регистрировались?",
      onToggle: handleToggle,
    },
    registration: {
      title: "Регистрация",
      submitText: "Зарегистрироваться",
      onSubmit: handleCreateUser,
      toggleText: "Вернуться ко входу",
      onToggle: handleToggle,
    },
  };

  async function handleLogin() {}

  async function handleCreateUser(e: SubmitEvent) {
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const res = await fetch("/api/user/create", {
      method: "POST",
      body: formData,
    });
    const { message } = await res.json();
    responseMessage = message;
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

<form class="w-[25em]" on:submit|preventDefault={steps[currentStep].onSubmit}>
  <p>Вам нужно зарегистрироваться или войти, чтобы продолжить</p>
  <p>{responseMessage}</p>

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
      onClick={steps[currentStep].onToggle}
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
