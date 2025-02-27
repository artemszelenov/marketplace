import { redirect } from "@sveltejs/kit";

export async function load({ fetch, cookies }) {
  if (cookies.get("pb_cart") === undefined) {
    throw redirect(303, "/");
  }

  // const cdek_access_token = await fetch(
  //   "https://api.edu.cdek.ru/v2/oauth/token?client_id=EMscd6r9JnFiQ3bLoyjJY6eM78JrJceI&client_secret=PjLZkKBHEiLK3YsjtNrt3TGNG0ahs3kG&grant_type=client_credentials",
  //   {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/x-www-form-urlencoded",
  //     },
  //   }
  // )
  //   .then((res) => res.json())
  //   .then(({ access_token }) => access_token);

  // const cdek_cities: CdekCity[] = await fetch(
  //   `https://api.edu.cdek.ru/v2/location/cities?lang=rus&country_codes=RU`,
  //   {
  //     headers: {
  //       authorization: `Bearer ${cdek_access_token}`,
  //     },
  //   }
  // ).then((res) => res.json());

  // cookies.set("cdek_token", cdek_access_token, { path: "/" });

  return {
    cdek_cities: [],
    seo: {
      title: "Оформление заказа",
    },
  };
}
