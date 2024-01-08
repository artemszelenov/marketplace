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

	type City = {
    address: string,
    postal_code: number,
    country: string,
    federal_district: string,
    region_type: string,
    region: string,
    area_type: string,
    area: string,
    city_type: string,
    city: string,
    settlement_type: string,
    settlement: string,
    kladr_id: string,
    fias_id: string,
    fias_level: number,
    capital_marker: number,
    okato: number,
    oktmo: number,
    tax_office: string,
    timezone: string,
    geo_lat: number,
    geo_lon: number,
    population: number,
    foundation_year: number
  }
}

interface ImportMetaEnv {
	readonly PUBLIC_POCKETBASE_URL: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}

export {};
