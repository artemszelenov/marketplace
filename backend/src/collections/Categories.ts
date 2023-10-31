import type { CollectionConfig } from 'payload/types'

const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title'
  },
  access: {
    read: () => true,
  },
  labels: {
    singular: {
      ru: 'Категория',
    },
    plural: {
      ru: 'Категории',
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

export default Categories
