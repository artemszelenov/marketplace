import { admins } from '../../access/admins'
import { anyone } from '../../access/anyone'
import { adminsAndUser } from './access/adminsAndUser'
import { checkRole } from './checkRole'
import type { CollectionConfig } from 'payload/types'

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  labels: {
    singular: {
      ru: 'Клиент',
    },
    plural: {
      ru: 'Клиенты',
    },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email'],
  },
  access: {
    read: adminsAndUser,
    create: anyone,
    update: adminsAndUser,
    delete: admins,
    admin: (({ req: { user } }) => checkRole(['admin'], user)),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: {
        ru: 'Имя'
      }
    },
    {
      name: 'roles',
      type: 'select',
      label: {
        ru: 'Роли'
      },
      hasMany: true,
      defaultValue: ['customer'],
      options: [
        {
          label: 'admin',
          value: 'admin'
        },
        {
          label: 'customer',
          value: 'customer'
        }
      ],
      access: {
        read: admins,
        create: admins,
        update: admins
      }
    },
    {
      name: 'shoeSizeMetric',
      type: 'select',
      label: {
        ru: 'Система размеров обуви'
      },
      hasMany: false,
      defaultValue: 'eu',
      options: [
        {
          label: 'EU',
          value: 'eu'
        },
        {
          label: 'UK',
          value: 'uk'
        }
      ],
      access: {
        read: anyone,
        create: anyone,
        update: anyone
      }
    },
    {
      name: 'purchases',
      label: 'Purchases',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
    },
    {
      name: 'cart',
      type: 'group',
      label: {
        ru: 'Корзина'
      },
      fields: [
        {
          name: 'items',
          label: 'Items',
          type: 'array',
          fields: [
            {
              name: 'product',
              type: 'relationship',
              relationTo: 'products',
            },
            {
              name: 'quantity',
              type: 'number',
              min: 1,
              admin: {
                step: 1,
              },
            },
          ],
        },
      ],
    },
  ]
}

export default Users