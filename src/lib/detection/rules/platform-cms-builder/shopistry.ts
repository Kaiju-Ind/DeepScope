import type { TechnologyDefinition } from '../../types';

export const shopistryTechnologyDefinition = {
	id: "shopistry",
	name: "Shopistry",
	website: "https://www.shopistry.com/",
	description: "Shopistry is a data-driven, headless customer management system.",
	icon: "Shopistry.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shopistry:dom:0",
			kind: "dom",
			selector: "img[src*='cdn.shopistrystage.com/'],link[imagesrcset*='cdn.shopistrystage.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
