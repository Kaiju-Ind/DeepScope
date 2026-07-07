import type { TechnologyDefinition } from '../../types';

export const delightedTechnologyDefinition = {
	id: "delighted",
	name: "Delighted",
	website: "https://delighted.com",
	description: "Delighted is a feedback collection and analysis SaaS, offering a web and mobile solution that uses the Net Promoter System (NPS) to gauge and score customer experience.",
	icon: "Delighted.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "delighted:jsGlobal:0",
			kind: "jsGlobal",
			property: "_delighted",
			description: "Page-owned global matches a known technology marker.",
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
