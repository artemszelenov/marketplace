import type { CollectionConfig } from 'payload/types'

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
      type: 'text'
    },
    {
      name: 'value',
      type: 'text',
      label: {
        ru: 'Значение'
      },
      admin: {
        description: 'Какое значение будет присвоено полю в базе данных'
      },
      required: true
    },
  ],
}

export default Sizes
