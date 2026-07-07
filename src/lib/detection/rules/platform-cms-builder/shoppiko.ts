import type { TechnologyDefinition } from '../../types';

export const shoppikoTechnologyDefinition = {
	id: "shoppiko",
	name: "Shoppiko",
	website: "https://shoppiko.com",
	description: "Shoppiko is an ecommerce platform solution in India, which provides ecommerce website or ecommerce mobile application.",
	icon: "Shoppiko.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shoppiko:dom:0",
			kind: "dom",
			selector: "a[href*='shoppiko.com'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
