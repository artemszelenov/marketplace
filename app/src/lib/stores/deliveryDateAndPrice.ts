import { persistentAtom } from "@nanostores/persistent";

export const deliveryDateAndPrice = persistentAtom("delivery_date_and_price:", null, {
  encode: JSON.stringify,
  decode: JSON.parse
});
