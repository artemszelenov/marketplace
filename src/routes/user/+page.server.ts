import { fail, redirect } from "@sveltejs/kit";
import type { ClientResponseError } from "pocketbase";

export async function load({ locals }) {
  if (!locals.user) {
    throw redirect(303, "/");
  }
}

export const actions = {
  login: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData());

    try {
      await locals.pb.collection('users')
        .authWithPassword(body.email.toString(), body.password.toString());
    } catch (err) {
      const error = err as ClientResponseError;
      console.error('Error: ', error.data);
      return fail(422, { errors: [error.data] });
    }

    throw redirect(303, body.referrer?.toString() ?? "/user");
  },
  register: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData());

    try {
      await locals.pb.collection('users')
        .create({
          email: body.email,
          password: body.password,
          passwordConfirm: body['password-confirm'],
          name: body.name
        });

      // TODO: добавить подтверждение email по почте
      await locals.pb.collection('users')
        .authWithPassword(body.email.toString(), body.password.toString());
    } catch (err) {
      const error = err as ClientResponseError;
      console.error('Error: ', error.data);
      return fail(422, { errors: [error.data] });
    }

    throw redirect(303, body.referrer?.toString() ?? "/user");
  },
  logout: async ({ locals }) => {
    locals.pb.authStore.clear();
    throw redirect(303, "/");
  },
}
