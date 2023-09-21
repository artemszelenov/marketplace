import { deleteProductFromCarts } from './hooks/deleteProductFromCarts'
import { populatePublishedDate } from './hooks/populatePublishedDate'
import type { CollectionConfig } from 'payload/types'

const Products: CollectionConfig = {
  slug: 'products',
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
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMM yyy',
          // calendarStartDay: 1
        },
      },
    },
    {
      name: 'gallery',
      type: 'array',
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true
        }
      ],
      labels: {
        singular: 'Image',
        plural: 'Images',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true
    },
    {
      name: 'description',
      type: 'textarea',
      required: true
    },
    {
      name: 'defaultPrice',
      type: 'number',
      required: true
    },
    {
      name: 'inStockCount',
      type: 'number',
      defaultValue: 0,
      required: true
    }
  ]
}

export default Products