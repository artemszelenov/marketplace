import { persistentMap } from "@nanostores/persistent";
import cities from "$lib/data/cities.json";

export const moscow = cities.find(({ postal_code }) => postal_code === 101000)!;

export const currentCity = persistentMap("current_city:", {
  postal_code: moscow.postal_code.toString(),
  latlng: JSON.stringify([moscow.geo_lat, moscow.geo_lon])
});
