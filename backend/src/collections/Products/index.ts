import { deleteProductFromCarts } from './hooks/deleteProductFromCarts'
import { populatePublishedDate } from './hooks/populatePublishedDate'
import type { CollectionConfig } from 'payload/types'

const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: {
      ru: 'Товар',
    },
    plural: {
      ru: 'Товары',
    },
  },
  admin: {
    useAsTitle: 'title'
  },
  access: {
    read: () => true
  },
  hooks: {
    beforeChange: [populatePublishedDate],
    afterDelete: [deleteProductFromCarts],
  },
  fields: [
    {
      name: 'publishedDate',
      type: 'date',
      label: {
        ru: 'Дата публикации'
      },
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMM yyy'
        },
      },
    },
    {
      name: 'gallery',
      type: 'array',
      label: {
        ru: 'Галлерея'
      },
      labels: {
        singular: 'Медиа',
        plural: 'Медиа',
      },
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'image',
          type: 'upload',
          label: {
            ru: 'Медиа'
          },
          relationTo: 'media',
          required: true
        }
      ],
    },
    {
      name: 'title',
      type: 'text',
      label: {
        ru: 'Заголовок'
      },
      required: true
    },
    {
      name: 'description',
      type: 'textarea',
      label: {
        ru: 'Описание'
      },
      required: true
    },
    {
      name: 'defaultPrice',
      type: 'number',
      label: {
        ru: 'Цена без учета доставки'
      },
      required: true
    },
    {
      name: 'inStockCount',
      type: 'number',
      label: {
        ru: 'Количество на складе'
      },
      defaultValue: 0,
      required: true
    }
  ]
}

export default Products