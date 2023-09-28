import { buildConfig, Config } from 'payload/config'
import path from 'path'
import Users from './collections/Users'
import Products from './collections/Products'
import Media from './collections/Media'
import Orders from './collections/Orders'

let config: Config = {
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
    }
  }
}

if (process.env.GENERATED_TYPES_PATH && process.env.FILE_NAME) {
  config = {
    ...config,
    typescript: {
      outputFile: path.join(process.env.GENERATED_TYPES_PATH, process.env.FILE_NAME)
    }
  }
}

if (process.env.MARKETPLACE_URL) {
  config = {
    ...config,
    cors: [process.env.MARKETPLACE_URL]
  }
}

export default buildConfig(config)
