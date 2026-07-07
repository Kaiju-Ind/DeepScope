import type { TechnologyDefinition } from '../../types';

export const shoppyTechnologyDefinition = {
	id: "shoppy",
	name: "Shoppy",
	website: "https://shoppy.gg",
	description: "Shoppy is an all-in-one payment processing and ecommerce solution.",
	icon: "Shoppy.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shoppy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.shoppy\\.gg"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "shoppy:jsGlobal:1",
			kind: "jsGlobal",
			property: "Shoppy",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
