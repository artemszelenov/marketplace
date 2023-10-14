import { me } from "$lib/server/cms/api/auth";

export async function handle({ event, resolve }) {
  const token = event.cookies.get("payload-token");

  if (token) {
    const meResponse = await me(token);
    const { user } = await meResponse.json();

    event.locals.user = user;
  }

  return resolve(event);
};
