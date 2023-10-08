import { login } from "../../../services/api/auth"
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies }) => {
  const data = await request.formData();
  const email = data.get("email").toString();
  const password = data.get("password").toString();

  const res = await login({
    email,
    password,
  })

  const { token } = await res.json()

  return new Response(JSON.stringify({
    message: 'Успешно'
  }), {
    status: 200
  })
};
