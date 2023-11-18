import { fail, redirect } from "@sveltejs/kit";
import * as cms from "$lib/server/cms/api/auth";

export async function load({ locals }) {
  if (!locals.user) {
    throw redirect(303, "/");
  }
}

export const actions = {
  login: async ({ request, cookies, locals, fetch }) => {
    const data = await request.formData();
    const emailInput = data.get("email");
    const passwordInput = data.get("password");
    const redirectTo = data.get("redirect-to");

    if (emailInput && passwordInput) {
      const res = await cms.login(fetch, {
        email: emailInput.toString(),
        password: passwordInput.toString()
      });

      const json = await res.json();

      const { token, exp, user, errors, message } = json;

      if (errors) {
        return fail(422, { errors });
      }

      cookies.set("payload-token", token, {
        maxAge: exp
      });

      locals.user = user;

      throw redirect(303, redirectTo?.toString() ?? "/user");
    }
  },
  register: async ({ request, cookies, locals, fetch }) => {
    const data = await request.formData();
    const emailInput = data.get("email");
    const passwordInput = data.get("password");
    const passwordConfirmInput = data.get("password-confirm");
    const nameInput = data.get("name");
    const redirectTo = data.get("redirect-to");

    // добавить подтверждение email по почте
    if (emailInput && passwordInput && passwordConfirmInput) {
      await cms.create(fetch, {
        email: emailInput.toString(),
        password: passwordInput.toString(),
        passwordConfirm: passwordConfirmInput.toString(),
        name: nameInput ? nameInput.toString() : emailInput.toString().split("@")[0]
      });

      const res = await cms.login(fetch, {
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
  logout: async ({ cookies, locals, fetch }) => {
    const token = cookies.get("payload-token");

    if (token) {
      await cms.logout(fetch, { token });
      cookies.delete("payload-token");
      locals.user = null;
      throw redirect(303, "/");
    }
  },
}
