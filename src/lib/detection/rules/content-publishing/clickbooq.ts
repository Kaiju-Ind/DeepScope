import type { TechnologyDefinition } from '../../types';

export const clickbooqTechnologyDefinition = {
	id: "clickbooq",
	name: "Clickbooq",
	website: "https://www.clickbooq.com",
	description: "Clickbooq is a website builder specially designed for photographers to showcase their work.",
	icon: "Clickbooq.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "clickbooq:dom:0",
			kind: "dom",
			selector: "div[data-large*='//fast.clickbooq.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
