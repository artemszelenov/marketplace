import { logout } from "../../../services/cms/api/auth";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
  const originalResponse = await logout(request)

  if (originalResponse.ok) {
    const response = new Response(originalResponse.body, {
      status: 301,
      headers: originalResponse.headers
    });

    response.headers.set("Location", "/");
    response.headers.set("Set-Cookie", originalResponse.headers.getSetCookie()[0]);

    return response;
  }

  return originalResponse;
};
