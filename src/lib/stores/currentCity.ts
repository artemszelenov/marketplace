import { persistentMap } from "@nanostores/persistent";

export const moscow = {
  cdek_city_code: '44',
  latlng: JSON.stringify([55.75222, 37.61556])
};

export const currentCity = persistentMap("current_city:", moscow);
