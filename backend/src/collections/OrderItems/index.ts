import type { CollectionConfig } from 'payload/types'
import { syncProducts } from './hooks/syncProducts'
import { admins } from '../../access/admins'

const OrderItems: CollectionConfig = {
  slug: 'order-items',
  admin: {
    useAsTitle: 'product',
    group: 'Заказы',
  },
  access: {
    read: admins,
    create: admins,
    update: admins,
    delete: admins,
  },
  labels: {
    singular: {
      ru: 'Товар заказа',
    },
    plural: {
      ru: 'Товары заказов',
    },
  },
  fields: [
    {
      name: 'deleted',
      type: 'checkbox',
      admin: {
        readOnly: true
      },
      // добавить хук который будет чекать этот филд если заказ доставлен
      // hooks: {
        
      // }
    },
    {
      name: 'order',
      type: 'relationship',
      relationTo: 'orders',
      label: {
        ru: 'Заказ'
      },
      hasMany: false,
      required: true
    },
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      hasMany: false,
    },
    {
      name: 'size',
      type: 'relationship',
      relationTo: ['shoe-sizes', 'clothing-sizes'],
      hasMany: false, // добавить фильтр по актуальным размерам товара
    },
    {
      name: 'defaultPrice',
      type: 'number',
    },
    {
      name: 'quantity',
      type: 'number',
    },
  ],
  // hooks: {
  //   beforeChange: [syncProducts]
  // }
}

export default OrderItems
