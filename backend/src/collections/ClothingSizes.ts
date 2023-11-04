import type { CollectionConfig } from 'payload/types'

const ClothingSizes: CollectionConfig = {
  slug: 'clothing-sizes',
  admin: {
    useAsTitle: 'title',
    group: 'Размеры'
  },
  access: {
    read: () => true,
  },
  labels: {
    singular: {
      ru: 'Размер одежды',
    },
    plural: {
      ru: 'Размеры одежды',
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: {
        ru: 'Размер'
      },
      admin: {
        placeholder: 'XS'
      },
      hooks: {
        beforeChange: [({ value }) => value.toUpperCase()]
      }
    },
    {
      name: 'chestSm',
      type: 'text',
      label: {
        ru: 'Размер в груди, см'
      },
      admin: {
        placeholder: '83-86'
      },
    },
    {
      name: 'waistSm',
      type: 'text',
      label: {
        ru: 'Размер в талии, см'
      },
      admin: {
        placeholder: '71-74'
      },
    },
    {
      name: 'hipSm',
      type: 'text',
      label: {
        ru: 'Размер в бёдрах, см'
      },
      admin: {
        placeholder: '82-85'
      },
    },
    {
      name: 'inseamSm',
      type: 'text',
      label: {
        ru: 'Размер внутреннего шва, см'
      },
      admin: {
        placeholder: '81',
        description: 'От промежности до пола'
      },
    },
    {
      name: 'heightSm',
      type: 'text',
      label: {
        ru: 'Высота, см'
      },
      admin: {
        placeholder: '130',
        description: 'От макушки головы до пола, сохраняя прямую осанку'
      },
    },
  ]
}

export default ClothingSizes
