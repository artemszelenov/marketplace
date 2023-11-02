import type { CollectionBeforeValidateHook } from 'payload/types'

export const validateUniqueByKey: CollectionBeforeValidateHook = async ({ data, req }) => {
  const { docs } = await req.payload.find({
    collection: req.collection.config.slug,
    where: {
      key: {
        equals: data.key,
      },
    },
  });

  if (docs.length > 0) {
    return { ...data, error: 'Должно быть уникальным' };
  }

  return data;
}
