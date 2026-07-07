import type { TechnologyDefinition } from '../../types';

export const fundrazrTechnologyDefinition = {
	id: "fundrazr",
	name: "FundRazr",
	website: "https://fundrazr.com",
	description: "FundRazr is an online fundraising and crowdfunding platform.",
	icon: "FundRazr.svg",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "fundrazr:dom:0",
			kind: "dom",
			selector: "link[href*='//static.fundrazr.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "fundrazr:jsGlobal:1",
			kind: "jsGlobal",
			property: "FundRazr",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
