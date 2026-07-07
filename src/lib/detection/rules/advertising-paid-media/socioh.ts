import type { TechnologyDefinition } from '../../types';

export const sociohTechnologyDefinition = {
	id: "socioh",
	name: "Socioh",
	website: "https://socioh.com",
	description: "Socioh is a social media marketing and retargeting platform designed to help businesses increase visibility, engagement, and conversions through targeted advertising and campaign management.",
	icon: "Socioh.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "socioh:dom:0",
			kind: "dom",
			selector: "link[href*='socioh.com'] [rel='canonical']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
