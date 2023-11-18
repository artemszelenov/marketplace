// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { z } from "zod";
import type { UserResult } from "$lib/schema";
type User = z.infer<typeof UserResult>;

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User | null
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
