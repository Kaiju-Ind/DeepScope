import type { TechnologyDefinition } from '../../types';

export const caisyTechnologyDefinition = {
	id: "caisy",
	name: "Caisy",
	website: "https://caisy.io",
	description: "Caisy is a headless CMS platform providing flexible content management, seamless integration with various devices and channels, and API access for structured content delivery.",
	icon: "Caisy.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "caisy:dom:0",
			kind: "dom",
			selector: "img[src*='assets.caisy.io/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
