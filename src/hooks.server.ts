import { PUBLIC_POCKETBASE_URL } from "$env/static/public";
import PocketBase from "pocketbase";
import type { User } from "$lib/schema";

export async function handle({ event, resolve }) {
  event.locals.pb = new PocketBase(PUBLIC_POCKETBASE_URL);
  event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || "");
  event.locals.user = null;

  if (event.locals.pb.authStore.isValid) {
    event.locals.user = event.locals.pb.authStore.model as User;
  }

  const response = await resolve(event);
  // TODO: make secure on prod
  response.headers.set('Set-Cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));
	return response;
};
