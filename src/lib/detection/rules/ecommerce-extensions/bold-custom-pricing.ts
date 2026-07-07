import type { TechnologyDefinition } from '../../types';

export const boldCustomPricingTechnologyDefinition = {
	id: "bold-custom-pricing",
	name: "Bold Custom Pricing",
	website: "https://boldcommerce.com/custom-pricing",
	description: "Bold Custom Pricing is an app that makes it easy to create a tiered pricing structure for your customers.",
	icon: "Bold.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "bold-custom-pricing:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cp.\\.boldapps\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bold-custom-pricing:jsGlobal:1",
			kind: "jsGlobal",
			property: "BOLD.csp.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
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
