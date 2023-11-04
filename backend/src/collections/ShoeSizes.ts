import type { CollectionConfig } from 'payload/types'

const ShoeSizes: CollectionConfig = {
  slug: 'shoe-sizes',
  admin: {
    useAsTitle: 'eu',
    group: 'Размеры'
  },
  access: {
    read: () => true,
  },
  labels: {
    singular: {
      ru: 'Размер обуви',
    },
    plural: {
      ru: 'Размеры обуви',
    },
  },
  fields: [
    {
      name: 'heelToe',
      type: 'text',
      label: {
        ru: 'Размер стопы, см'
      },
      admin: {
        placeholder: '22.1 см'
      },
    },
    {
      name: 'eu',
      type: 'text',
      label: {
        ru: 'EU'
      },
      admin: {
        placeholder: '42'
      },
    },
    {
      name: 'uk',
      type: 'text',
      label: {
        ru: 'UK'
      },
      admin: {
        placeholder: '3.5'
      },
    },
  ]
}

export default ShoeSizes
