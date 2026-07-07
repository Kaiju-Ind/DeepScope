import type { TechnologyDefinition } from '../../types';

export const vendioTechnologyDefinition = {
	id: "vendio",
	name: "Vendio",
	website: "https://www.vendio.com",
	description: "Vendio is an ecommerce software facilitating selling across platforms like eBay, Amazon, and Etsy.",
	icon: "Vendio.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "vendio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("stores\\.vendio\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
