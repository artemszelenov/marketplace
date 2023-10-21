// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				email: string
				name?: string
				id: string
				roles: string[]
				cart: object
			} | null
			seo: {
				title: string
			}
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};

interface ImportMetaEnv {
  readonly PUBLIC_BACKEND_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
