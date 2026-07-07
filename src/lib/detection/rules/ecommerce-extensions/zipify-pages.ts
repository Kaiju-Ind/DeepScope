import type { TechnologyDefinition } from '../../types';

export const zipifyPagesTechnologyDefinition = {
	id: "zipify-pages",
	name: "Zipify Pages",
	website: "https://zipify.com/apps/pages/",
	description: "Zipify Pages the first landing page builder uniquely designed for ecommerce.",
	icon: "Zipify Pages.svg",
	categories: [
		"ecommerce-extensions",
		"platform-cms-builder",
	],
	rules: [
		{
			id: "zipify-pages:jsGlobal:0",
			kind: "jsGlobal",
			property: "ZipifyPages",
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
