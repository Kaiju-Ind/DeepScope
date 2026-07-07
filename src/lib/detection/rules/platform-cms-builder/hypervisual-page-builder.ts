import type { TechnologyDefinition } from '../../types';

export const hypervisualPageBuilderTechnologyDefinition = {
	id: "hypervisual-page-builder",
	name: "Hypervisual Page Builder",
	website: "https://gethypervisual.com",
	description: "Hypervisual Page Builder is a page builder for Shopify.",
	icon: "Hypervisual.png",
	categories: [
		"platform-cms-builder",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "hypervisual-page-builder:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.gethypervisual\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "hypervisual-page-builder:jsGlobal:1",
			kind: "jsGlobal",
			property: "hypervisualPreflight",
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
