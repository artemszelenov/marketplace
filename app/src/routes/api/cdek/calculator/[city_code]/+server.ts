import { json } from "@sveltejs/kit";

export const POST = async ({ cookies, locals, params, fetch }) => {
  const cdek_token = cookies.get("cdek_token");
  const cart_id = cookies.get("pb_cart");

  const cart_items_records = await locals.pb
    .collection("cart_items")
    .getFullList({
      filter: `cart = "${cart_id}"`,
      expand: "stock_item, stock_item.product",
    });

  const packages = cart_items_records.map((cart_item) => {
    const stock_item = cart_item.expand?.stock_item;
    const product = stock_item.expand?.product;
    return {
      weight: product.weight_in_gram,
    };
  });

  const date_from = new Date();
  date_from.setDate(date_from.getDate() + 2); // current date + 2 days

  const data = await fetch(`https://api.edu.cdek.ru/v2/calculator/tariff`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${cdek_token}`,
    },
    body: JSON.stringify({
      // date: date_from.toISOString(),
      from_location: {
        code: 268, // omsk
      },
      to_location: {
        code: params.city_code,
      },
      tariff_code: 136,
      packages,
    }),
  }).then((res) => res.json());

  return json(data);
};
