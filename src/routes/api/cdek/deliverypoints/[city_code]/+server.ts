import { json } from '@sveltejs/kit';

export const GET = async ({ cookies, params, fetch }) => {
  const cdek_token = cookies.get('cdek_token');

  const deliverypoints = await fetch(`https://api.edu.cdek.ru/v2/deliverypoints?city_code=${params.city_code}`, {
    headers: {
      'authorization': `Bearer ${cdek_token}`
    }
  })
    .then(res => res.json());

  return json(deliverypoints);
}