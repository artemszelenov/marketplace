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
    defaultColumns: ['createdAt'],
    group: 'Заказы'
  },
  access: {
    read: adminsAndOrderedBy,
    create: adminsAndOrderedBy,
    update: admins,
    delete: admins,
  },
  hooks: {
    afterChange: [syncUser]
  },
  fields: [
    {
      name: 'delivered',
      type: 'checkbox',
    },
    {
      name: 'total',
      type: 'number',
    },
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
        {
          name: 'email',
          type: 'text',
        }
      ],
    },
    {
      name: 'orderItems',
      type: 'relationship',
      relationTo: 'order-items',
      hasMany: true,
    },
  ],
}

export default Orders