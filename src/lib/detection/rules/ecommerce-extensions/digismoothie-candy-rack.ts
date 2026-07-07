import type { TechnologyDefinition } from '../../types';

export const digismoothieCandyRackTechnologyDefinition = {
	id: "digismoothie-candy-rack",
	name: "Digismoothie Candy Rack",
	website: "https://www.digismoothie.com/apps/candy-rack",
	description: "Digismoothie Candy Rack is an upsell app for Shopify which allow merchants to offer custom services or bundle products.",
	icon: "Digismoothie.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "digismoothie-candy-rack:jsGlobal:0",
			kind: "jsGlobal",
			property: "CANDYRACK_DOCUMENT_LISTENER",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "digismoothie-candy-rack:jsGlobal:1",
			kind: "jsGlobal",
			property: "candyrackEnableDebug",
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
