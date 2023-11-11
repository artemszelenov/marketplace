import { BACKEND_URL } from "$env/static/private";
import type { User, Order } from "$lib/schema";

type Payload = {
  order: Order,
  user: User
}

export const proceedOrder = async (query: typeof fetch, { order, user }: Payload) => {
  const items = order.items.map(({ id, size, product, quantity }) => {
    const [productID] = id.split(":");

    return {
      product: productID,
      title: product.title,
      size: {
        value: size.valueID,
        relationTo: size.relationTo
      },
      quantity
    }
  });

  return query(`${BACKEND_URL}/api/orders`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': 'ru'
    },
    body: JSON.stringify({
      orderedBy: {
        user: user.id,
        name: user.name,
        email: user.email,
      },
      items
    })
  });
}