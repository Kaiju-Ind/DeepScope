import type { TechnologyDefinition } from '../../types';

export const zalifyTechnologyDefinition = {
	id: "zalify",
	name: "Zalify",
	website: "https://www.zalify.com",
	description: "Zalify is a data-driven growth engine for Shopify merchants, designed to provide agility and precision in the ecommerce environment.",
	icon: "Zalify.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "zalify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.zalify\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "zalify:jsGlobal:1",
			kind: "jsGlobal",
			property: "zalify.render",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "zalify:jsGlobal:2",
			kind: "jsGlobal",
			property: "zalifyCurrentScript",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
