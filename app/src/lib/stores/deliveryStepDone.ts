import { persistentAtom } from "@nanostores/persistent";

export const deliveryStepDone = persistentAtom("delivery_step_done:", false, {
  encode: JSON.stringify,
  decode: JSON.parse
});
