import type { TechnologyDefinition } from '../../types';

export const looxTechnologyDefinition = {
	id: "loox",
	name: "Loox",
	website: "https://loox.app",
	description: "Loox is a reviews app for Shopify that helps you gather reviews and user-generated photos from your customers.",
	icon: "Loox.svg",
	categories: [
		"community-ugc",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "loox:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("loox\\.io\\/widget"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "loox:jsGlobal:1",
			kind: "jsGlobal",
			property: "loox_global_hash",
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
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
