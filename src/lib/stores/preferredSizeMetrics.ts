import type { StoragePreferredShoesSizeMetric } from "$lib/schema";

import { persistentMap } from "@nanostores/persistent";

export const preferredShoesSizeMetric = persistentMap<StoragePreferredShoesSizeMetric>("preferred_shoes_size_metric:", {
  title: "EU",
  value: "eu"
});
  