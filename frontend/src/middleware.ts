import { me } from "./payload/auth";

export async function onRequest({ locals, request }, next) {
  const { user } = await me();

  console.log(user);

  locals.user = user;

  return next();
};
