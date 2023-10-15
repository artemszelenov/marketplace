import { fail, redirect } from "@sveltejs/kit";
import * as cms from "$lib/server/cms/api/auth";

export const actions = {
  login: async ({ request, cookies, locals }) => {
    const data = await request.formData();
    const emailInput = data.get("email");
    const passwordInput = data.get("password");
    const redirectTo = data.get("redirect-to");

    if (emailInput && passwordInput) {
      const res = await cms.login({
        email: emailInput.toString(),
        password: passwordInput.toString()
      });

      const { token, exp, user } = await res.json();

      cookies.set("payload-token", token, {
        maxAge: exp
      });

      locals.user = user;

      throw redirect(303, redirectTo?.toString() ?? "/user");
    }
  },
  register: async ({ request, cookies, locals }) => {
    const data = await request.formData();
    const emailInput = data.get("email");
    const passwordInput = data.get("password");
    const passwordConfirmInput = data.get("password-confirm");
    const nameInput = data.get("name");
    const redirectTo = data.get("redirect-to");

    // добавить подтверждение email по почте
    if (emailInput && passwordInput && passwordConfirmInput) {
      await cms.create({
        email: emailInput.toString(),
        password: passwordInput.toString(),
        passwordConfirm: passwordConfirmInput.toString(),
        name: nameInput ? nameInput.toString() : emailInput.toString().split("@")[0]
      });

      const res = await cms.login({
        email: emailInput.toString(),
        password: passwordInput.toString()
      });

      const { token, exp, user } = await res.json();

      cookies.set("payload-token", token, {
        maxAge: exp
      });

      locals.user = user;

      throw redirect(303, redirectTo?.toString() ?? "/user");
    }
  },
  logout: async ({ cookies, locals }) => {
    const token = cookies.get("payload-token");

    if (token) {
      await cms.logout(token);
      cookies.delete("payload-token");
      locals.user = null;
      throw redirect(303, "/");
    }
  },
}
