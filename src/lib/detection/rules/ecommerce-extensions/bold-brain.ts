import type { TechnologyDefinition } from '../../types';

export const boldBrainTechnologyDefinition = {
	id: "bold-brain",
	name: "Bold Brain",
	website: "https://boldcommerce.com/bold-brain",
	description: "Bold Brain help customers discover more products and add more to their cart with dynamic recommendations for Shopify and use advanced analytics.",
	icon: "Bold.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "bold-brain:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("brain-assets\\.boldapps\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bold-brain:jsGlobal:1",
			kind: "jsGlobal",
			property: "BOLD.brain",
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
	implies: [
		"bold-commerce",
		"shopify",
	],
} as const satisfies TechnologyDefinition;
