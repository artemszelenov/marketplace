import { buildConfig, Config } from 'payload/config'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { viteBundler } from '@payloadcms/bundler-vite'
import path from 'path'
import Users from './collections/Users'
import Products from './collections/Products'
import Media from './collections/Media'
import Orders from './collections/Orders'
import OrderItems from './collections/OrderItems'
import Categories from './collections/Categories'
import ShoeSizes from './collections/ShoeSizes'
import ClothingSizes from './collections/ClothingSizes'

let config: Config = {
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  db: mongooseAdapter({
    url: process.env.MONGODB_URI
  }),
  admin: {
    user: Users.slug,
    bundler: viteBundler()
  },
  editor: lexicalEditor({}),
  collections: [
    Users,
    Orders,
    OrderItems,
    Products,
    Categories,
    ShoeSizes,
    ClothingSizes,
    Media,
  ],
  upload: {
    limits: {
      fileSize: 5000000, // 5MB, written in bytes
    }
  },
  i18n: {
    fallbackLng: 'en',
    lng: 'ru'
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
