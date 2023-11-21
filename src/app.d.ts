// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { z } from "zod";
import type PocketBase from "pocketbase";
import type { User } from "$lib/schema";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User | null
			pb: PocketBase
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
  readonly PUBLIC_POCKETBASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
