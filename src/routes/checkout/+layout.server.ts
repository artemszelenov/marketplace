export async function load({ fetch, cookies }) {
  const cdek_access_token = await fetch(
    'https://api.edu.cdek.ru/v2/oauth/token?client_id=EMscd6r9JnFiQ3bLoyjJY6eM78JrJceI&client_secret=PjLZkKBHEiLK3YsjtNrt3TGNG0ahs3kG&grant_type=client_credentials',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(res => res.json())
    .then(({ access_token }) => access_token);

  const cdek_cities = await fetch(`https://api.edu.cdek.ru/v2/location/cities?lang=rus&country_codes=RU`, {
    headers: {
      'Authorization': `Bearer ${cdek_access_token}`
    }
  })
    .then(res => res.json());

  cookies.set('cdek_token', cdek_access_token, { path: '/' });

  return {
    cdek_cities: cdek_cities.sort((city_a, city_b) => {
      const first_city_name = city_a.city.toLowerCase()
      const second_city_name = city_b.city.toLowerCase()

      if (first_city_name < second_city_name) {
        return -1
      }
      if (first_city_name > second_city_name) {
        return 1
      }
      return 0
    }),
    seo: {
      title: "Оформление заказа"
    }
  }
}
