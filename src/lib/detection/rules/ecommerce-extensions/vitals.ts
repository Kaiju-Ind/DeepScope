import type { TechnologyDefinition } from '../../types';

export const vitalsTechnologyDefinition = {
	id: "vitals",
	name: "Vitals",
	website: "https://vitals.co",
	description: "Vitals is an all-in-one Shopify marketing software.",
	icon: "Vitals.svg",
	categories: [
		"ecommerce-extensions",
		"marketing-automation",
	],
	rules: [
		{
			id: "vitals:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/appsolve\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vitals:jsGlobal:1",
			kind: "jsGlobal",
			property: "VITALS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "vitals:jsGlobal:2",
			kind: "jsGlobal",
			property: "vitals_app_cache_keys_v1",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "vitals:jsGlobal:3",
			kind: "jsGlobal",
			property: "vitals_country_code",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "vitals:jsGlobal:4",
			kind: "jsGlobal",
			property: "vitals_product_data",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
