import type { CollectionConfig } from 'payload/types'
import { validateUniqueByKey } from '../hooks/validateUniqueByKey'

const Sizes: CollectionConfig = {
  slug: 'sizes',
  admin: {
    useAsTitle: 'title',
    group: 'Товары'
  },
  access: {
    read: () => true,
  },
  labels: {
    singular: {
      ru: 'Размер',
    },
    plural: {
      ru: 'Размеры',
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: {
        ru: 'Название'
      },
      admin: {
        description: 'Это значение увидит клиент. Например: XS; 46; 32/36 и тд.',
        placeholder: '46'
      },
      required: true
    },
    {
      name: 'key',
      type: 'text',
      label: {
        ru: 'Ключ'
      },
      admin: {
        description: 'Какое значение будет присвоено полю в базе данных. Например: dickies-32.'
      },
      required: true,
      validate: async (_value, { data }) => {
        return data.error ?? true
      },
    },
  ],
  hooks: {
    beforeValidate: [validateUniqueByKey]
  }
}

export default Sizes
