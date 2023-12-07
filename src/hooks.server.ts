import { PUBLIC_POCKETBASE_URL } from "$env/static/public";
import PocketBase from "pocketbase";

export async function handle({ event, resolve }) {
  event.locals.pb = new PocketBase(PUBLIC_POCKETBASE_URL);
  event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || "");

  if (event.locals.pb.authStore.isValid) {
    const logged_in_user = event.locals.pb.authStore.model!;
    event.locals.user = {
      id: logged_in_user.id,
      username: logged_in_user.username,
      name: logged_in_user.name,
      email: logged_in_user.email,
      verified: logged_in_user.verified
    };
  } else {
    event.locals.user = null;
  }

  const response = await resolve(event);

  // TODO: make secure on prod
  response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));

	return response;
};
