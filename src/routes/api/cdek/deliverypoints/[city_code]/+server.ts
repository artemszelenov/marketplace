export const GET = async ({ cookies, params }) => {
  const cdek_token = cookies.get('cdek_token');

  const deliverypoints = await fetch(`https://api.edu.cdek.ru/v2/deliverypoints?city_code=${params.city_code}`, {
    headers: {
      'Authorization': `Bearer ${cdek_token}`
    }
  })
    .then(res => res.json());

  return new Response(JSON.stringify(deliverypoints));
}