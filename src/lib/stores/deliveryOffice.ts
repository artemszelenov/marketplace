import { persistentAtom } from "@nanostores/persistent";

export const deliveryOffice = persistentAtom("delivery_office:", null, {
  encode: JSON.stringify,
  decode: JSON.parse,
});
