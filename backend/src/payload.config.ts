import { buildConfig } from 'payload/config'
import path from 'path'
import Users from './collections/Users'
import Products from './collections/Products'
import Media from './collections/Media'
import Orders from './collections/Orders'

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Products,
    Media,
    Orders
  ],
  upload: {
    limits: {
      fileSize: 5000000, // 5MB, written in bytes
    },
  },
  typescript: {
    outputFile: path.join(process.env.GENERATED_TYPES_PATH, 'payload-types.ts'),
  }
})
