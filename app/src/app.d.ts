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

	const DG: any // 2гис карта

	type CdekCity = {
    code: number,
    city_uuid: string,
    city: string,
    kladr_code: string,
    country_code: string,
    country: string,
    region: string,
    region_code: number,
    sub_region: string,
    longitude: number,
    latitude: number,
    time_zone: string,
    payment_limit: number
  }
}

interface ImportMetaEnv {
	readonly PUBLIC_POCKETBASE_URL: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}

export {};
