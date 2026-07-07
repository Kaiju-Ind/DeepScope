import type { TechnologyDefinition } from '../../types';

export const rontarTechnologyDefinition = {
	id: "rontar",
	name: "Rontar",
	website: "https://www.rontar.com",
	description: "Rontar is a provider of ad management solutions catering to businesses seeking effective advertising strategies and optimization tools.",
	icon: "Rontar.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "rontar:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.rontar\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "rontar:jsGlobal:1",
			kind: "jsGlobal",
			property: "RontarAddToCartFunction",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
