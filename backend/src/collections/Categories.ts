import type { CollectionConfig } from 'payload/types'
import { validateUniqueByKey } from '../hooks/validateUniqueByKey'

const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
    group: 'Товары'
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
      type: 'text',
      label: {
        ru: 'Название'
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
        description: 'Какое значение будет присвоено полю в базе данных. Например: underwear.'
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

export default Categories
