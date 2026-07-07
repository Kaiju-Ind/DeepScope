import type { TechnologyDefinition } from '../../types';

export const shoploTechnologyDefinition = {
	id: "shoplo",
	name: "Shoplo",
	website: "https://www.shoplo.com",
	description: "Shoplo is an all-in-one ecommerce platform.",
	icon: "Shoplo.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shoplo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.shoplo\\.\\w+\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "shoplo:jsGlobal:1",
			kind: "jsGlobal",
			property: "SHOPLOAJAX",
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
} as const satisfies TechnologyDefinition;
