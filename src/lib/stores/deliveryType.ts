import { persistentAtom } from "@nanostores/persistent";

type DeliveryType = 'courier' | 'pickup';

export const deliveryType = persistentAtom<DeliveryType>("delivery_type:", 'pickup');
