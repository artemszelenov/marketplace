import { me } from "$lib/server/cms/api/auth";

export async function handle({ event, resolve }) {
  const token = event.cookies.get("payload-token");
  let user = null

  if (token) {
    const meResponse = await me(token);
    const json = await meResponse.json();
    user = json.user
  }

  event.locals.user = user;

  return resolve(event);
};
