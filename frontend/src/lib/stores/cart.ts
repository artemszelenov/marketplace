import type { StorageCartItem, Size } from "$lib/schema";

type Payload = {
  productID: string,
  size?: Size
}

import { action, computed } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";

export const cartItems = persistentAtom<StorageCartItem[]>('cart_items', [], {
  encode: JSON.stringify,
  decode: JSON.parse
});

export const addOne = action(cartItems, 'addOne', (cartItems, { productID, size }: Payload) => {
  if (!size) return;

  const id = createID(productID, size);
  const currentCartItem = cartItems.get().find(item => item.id === id);

  if (currentCartItem) {
    if (currentCartItem.q + 1 > size.inStockCount) return currentCartItem;

    cartItems.set(cartItems.get().map(item => {
      if (item.id === id) {
        return { ...item, q: item.q += 1 }
      }
      return item;
    }))

    return currentCartItem;
  }

  const newItem = { id, q: 1 }

  cartItems.set([...cartItems.get(), newItem]);

  return newItem;
});

export const removeOne = action(cartItems, 'removeOne', (cartItems, { productID, size }: Payload) => {
  if (!size) return;

  const id = createID(productID, size);
  const currentCartItem = cartItems.get().find(item => item.id === id);

  if (currentCartItem) {
    if (currentCartItem.q === 1) {
      cartItems.set(cartItems.get().filter(item => item.id !== id));
    } else {
      cartItems.set(cartItems.get().map(item => {
        if (item.id === id) {
          return { ...item, q: item.q -= 1 }
        }
        return item;
      }))
    }

    return currentCartItem;
  }

  return null;
});

export const clear = action(cartItems, 'clear', cartItems => {
  cartItems.set([]);
  return cartItems.get();
});

export function createID(productID: string, size: Size) {
  return `${productID}:${size.id}`
};

export const queryString = computed(cartItems, store => {
  if (store.length === 0) return "";

  const ids = store.map(item => item.id).join(',');

  return `?items=${ids}`;
});

queryString.listen(value => {
  const { origin, pathname } = window.location
  if (pathname === "/cart") {
    window.history.replaceState({}, "", origin + pathname + value);
  }
});
  