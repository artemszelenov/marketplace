import type { BeforeChangeHook } from 'payload/dist/collections/config/types'
import type { OrderItem } from '@/payload-types'

// sync user purchases and delete their cart when they place an order

export const syncProducts: BeforeChangeHook<OrderItem> = async ({
  req,
  doc,
  // operation
}) => {
  const { payload } = req
  const { items } = doc

  console.log('items', items)

  items.forEach(async item => {
    const { product } = item
    const { id } = product
    const { quantity } = item

    const productDoc = await payload.findByID({
      collection: 'products',
      id: product.id
    });

    // productDoc.sizes.find();

    // await payload.update({
    //   collection: 'products',
    //   id: product.id,
    //   data: {
    //     sizes: {
    //       inStockCount: quantity
    //     }
    //   },
    // })
  })
}
