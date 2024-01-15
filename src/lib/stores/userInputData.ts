import { persistentMap } from "@nanostores/persistent";

const fieldsMap = {
  fullname: {
    name: "fullname",
    data: "",
    valid: false
  },
  phone: {
    name: "phone",
    data: "",
    valid: false
  },
  email: {
    name: "email",
    data: "",
    valid: false
  }
}

export const userInputData = persistentMap("user_input_data:", fieldsMap, {
  encode: JSON.stringify,
  decode: JSON.parse
});
