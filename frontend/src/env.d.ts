/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    user: {
      email: string
      name?: string
      id: string
      roles: string[]
      cart: object
    } | null
  }
}

interface ImportMetaEnv {
  readonly PUBLIC_BACKEND_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
