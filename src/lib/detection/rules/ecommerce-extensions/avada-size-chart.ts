import type { TechnologyDefinition } from '../../types';

export const avadaSizeChartTechnologyDefinition = {
	id: "avada-size-chart",
	name: "Avada Size Chart",
	website: "https://apps.shopify.com/avada-size-chart",
	description: "Avada Size Chart is a thoughtful app that helps online stores reduce return rates with useful size guides.",
	icon: "Avada.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "avada-size-chart:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sizechart\\.apps\\.avada\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
