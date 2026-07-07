import type { TechnologyDefinition } from '../../types';

export const boldBundlesTechnologyDefinition = {
	id: "bold-bundles",
	name: "Bold Bundles",
	website: "https://boldcommerce.com/bundles",
	description: "Bold Bundles Shopify app is designed to present recommended product widgets to cross-sell your products.",
	icon: "Bold.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "bold-bundles:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("bundles\\.boldapps\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bold-bundles:jsGlobal:1",
			kind: "jsGlobal",
			property: "BOLD.bundles",
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
		"bold-commerce",
		"shopify",
	],
} as const satisfies TechnologyDefinition;
