import { login } from "../../../services/cms/api/auth"
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies }) => {
  const data = await request.formData();
  const email = data.get("email").toString();
  const password = data.get("password").toString();

  const originalResponse = await login({
    email,
    password,
  });

  const response = new Response(
    originalResponse.body,
    {
      status: 301,
      headers: originalResponse.headers
    }
  );

  response.headers.set("Location", "/");

  return response;
};
