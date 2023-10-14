import { create, login } from "$lib/server/cms/api/auth";

export const actions = {
  login: async ({ request }) => {
    const data = await request.formData();
    const emailInput = data.get("email");
    const passwordInput = data.get("password");

    if (emailInput && passwordInput) {
      login({
        email: emailInput.toString(),
        password: passwordInput.toString()
      });
    }
  },
  register: async ({ request }) => {
    const data = await request.formData();
    const emailInput = data.get("email");
    const passwordInput = data.get("password");
    const passwordConfirmInput = data.get("password-confirm");
    const nameInput = data.get("name");

    if (emailInput && passwordInput && passwordConfirmInput) {
      create({
        email: emailInput.toString(),
        password: passwordInput.toString(),
        passwordConfirm: passwordConfirmInput.toString(),
        name: nameInput ? nameInput.toString() : emailInput.toString().split("@")[0]
      })
    }
  }
}