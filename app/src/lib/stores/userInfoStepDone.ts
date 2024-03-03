import { persistentAtom } from "@nanostores/persistent";

export const userInfoStepDone = persistentAtom("user_info_step_done:", false, {
  encode: JSON.stringify,
  decode: JSON.parse
});
