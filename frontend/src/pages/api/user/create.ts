import { create } from "../../../services/api/auth"
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const email = data.get("email").toString();
  const password = data.get("password").toString();
  const passwordConfirm = data.get("password-confirm").toString();
  const name = data.get("name").toString();

  const res = await create({
    email,
    password,
    passwordConfirm,
    name
  })

  const { message, doc } = await res.json()

  if (doc.id) {
    return new Response(JSON.stringify({
      message: `${name ?? email.split("@")[0]}, вы успешно зарегистрировались.`
    }), {
      status: 200
    })
  }

  return new Response(JSON.stringify({
    message: "Ошибка на сервере."
  }), {
    status: 500
  })
};
