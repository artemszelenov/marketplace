import { create } from "../../../payload/auth"
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const email = data.get("email").toString();
  const password = data.get("password").toString();
  const passwordConfirm = data.get("password-confirm").toString();
  const name = data.get("name").toString();

  const { message, doc } = await create({
    email,
    password,
    passwordConfirm,
    name
  })

  if (doc.id) {
    return new Response(JSON.stringify({
      message: `${name ?? email.split("@")[0]}, вы успешно зарегистрировались!`
    }), {
      status: 200
    })
  }

  return new Response(JSON.stringify({
    message: "Ошибка на сервере"
  }), {
    status: 500
  })
};
