import type { TechnologyDefinition } from '../../types';

export const waashipTechnologyDefinition = {
	id: "waaship",
	name: "Waaship",
	website: "https://waaship.com",
	description: "Waaship is an all-in-one fulfillment software designed to manage orders, inventory, picking, packing, and shipping.",
	icon: "Waaship.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "waaship:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("platform-app\\.waaship\\.com"),
			description: "Script source URL matches a known technology marker.",
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
