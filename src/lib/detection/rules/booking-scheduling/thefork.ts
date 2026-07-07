import type { TechnologyDefinition } from '../../types';

export const theforkTechnologyDefinition = {
	id: "thefork",
	name: "Thefork",
	website: "https://www.thefork.com",
	description: "Thefork is a restaurant booking, managing system.",
	icon: "Thefork.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "thefork:dom:0",
			kind: "dom",
			selector: "iframe[data-src*='lafourchette']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "thefork:dom:1",
			kind: "dom",
			selector: "iframe[src*='lafourchette']",
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
