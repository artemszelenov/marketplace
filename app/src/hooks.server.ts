import { ORIGIN_BACKEND_INTERNAL, ORIGIN_BACKEND } from '$env/static/private';
import { dev } from '$app/environment';
import PocketBase from "pocketbase";

export async function handle({ event, resolve }) {
  event.locals.pb = new PocketBase(ORIGIN_BACKEND_INTERNAL);
  event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || "");

  event.locals.pb_helpers = {
    files: {
      getFileUrlWithCorrectOrigin(record, filename) {
        return event.locals.pb.files
          .getUrl(record, filename)
          .replace(ORIGIN_BACKEND_INTERNAL, ORIGIN_BACKEND)
      }
    }
  }

  try {
    if (event.locals.pb.authStore.isValid) {
      await event.locals.pb.collection("users").authRefresh();
      const logged_in_user = event.locals.pb.authStore.model!;
      event.locals.user = {
        id: logged_in_user.id,
        username: logged_in_user.username,
        name: logged_in_user.name,
        email: logged_in_user.email,
        verified: logged_in_user.verified,
        company_name: logged_in_user.company_name
      };
    }
  } catch (_) {
    event.locals.pb.authStore.clear();
    event.locals.user = null;
  }

  const response = await resolve(event);

  response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: !dev }));

	return response;
};
