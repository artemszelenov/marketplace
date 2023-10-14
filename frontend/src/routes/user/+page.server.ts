import { logout } from "$lib/server/cms/api/auth";

export const actions = {
  logout: async ({ cookies }) => {
    const token = cookies.get("payload-token");

    if (token) {
      logout(token)
      // const response = new Response(originalResponse.body, {
      //   status: 301,
      //   headers: originalResponse.headers
      // });

      // response.headers.set("Location", "/");
      // response.headers.set("Set-Cookie", originalResponse.headers.getSetCookie()[0]);
    }
  },
}
