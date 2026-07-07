import type { TechnologyDefinition } from '../../types';

export const storeplumTechnologyDefinition = {
	id: "storeplum",
	name: "Storeplum",
	website: "https://www.storeplum.com",
	description: "Storeplum is a no-code ecommerce platform.",
	icon: "Storeplum.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "storeplum:dom:0",
			kind: "dom",
			selector: "a[href*='//storeplum.in/'][target='_blank']",
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
