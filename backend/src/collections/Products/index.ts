import type { CollectionConfig } from 'payload/types'

import { deleteProductFromCarts } from './hooks/deleteProductFromCarts'
import { populatePublishedDate } from './hooks/populatePublishedDate'

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
    useAsTitle: 'title',
    group: 'Товары'
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
      name: 'categories',
      type: 'relationship',
      label: {
        ru: 'Категории'
      },
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: {
            ru: 'Медиа'
          },
          fields: [
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
          ]
        },
        {
          label: {
            ru: 'Контент'
          },
          fields: [
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
          ]
        },
        {
          label: {
            ru: 'Детали продукта'
          },
          fields: [
            {
              name: 'defaultPrice',
              type: 'number',
              label: {
                ru: 'Цена без учета доставки'
              },
              required: true
            },
          ]
        },
        {
          label: {
            ru: 'Размеры'
          },
          fields: [
            {
              name: 'sizes',
              type: 'array',
              label: {
                ru: 'Размеры'
              },
              labels: {
                singular: 'Размер',
                plural: 'Размеры',
              },
              minRows: 1,
              fields: [
                {
                  name: 'size',
                  type: 'relationship',
                  relationTo: 'sizes',
                  hasMany: false,
                  label: {
                    ru: 'Размер'
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
              ],
            },
          ]
        }
      ]
    },
  ]
}

export default Products