import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { adminsAndOrderedBy } from './access/adminsAndOrderedBy'
import { syncUser } from './hooks/syncUser'

const Orders: CollectionConfig = {
  slug: 'orders',
  labels: {
    singular: {
      ru: 'Заказ',
    },
    plural: {
      ru: 'Заказы',
    },
  },
  admin: {
    useAsTitle: 'createdAt',
    defaultColumns: ['createdAt']
  },
  access: {
    read: adminsAndOrderedBy,
    create: adminsAndOrderedBy,
    update: admins,
    delete: admins,
  },
  hooks: {
    afterChange: [syncUser],
  },
  timestamps: true,
  fields: [
    {
      name: 'orderedBy',
      type: 'group',
      admin: {
        readOnly: true,
      },
      fields: [
        {
          name: 'user',
          type: 'relationship',
          relationTo: 'users',
          hasMany: false,
        },
        // keep a static copy of these fields as they appear at the time of the order
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'email',
          type: 'text',
        }
      ],
    },
    {
      name: 'items',
      type: 'array',
      admin: {
        readOnly: true,
      },
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          hasMany: false,
        },
        // keep a static copy of these fields as they appear at the time of the order
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'quantity',
          type: 'number',
        },
      ],
    },
  ],
}

export default Orders