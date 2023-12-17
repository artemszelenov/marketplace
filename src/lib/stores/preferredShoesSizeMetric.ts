import { StoragePreferredShoesSizeMetricSchema } from "$lib/schema";
import type { StoragePreferredShoesSizeMetric } from "$lib/schema";

import { persistentAtom } from "@nanostores/persistent";

export const preferredShoesSizeMetric = persistentAtom<StoragePreferredShoesSizeMetric>("preferred_shoes_size_metric:", "eu");

export const AVAILABLE_METRICS = StoragePreferredShoesSizeMetricSchema.options;
