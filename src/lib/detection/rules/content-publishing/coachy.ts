import type { TechnologyDefinition } from '../../types';

export const coachyTechnologyDefinition = {
	id: "coachy",
	name: "Coachy",
	website: "https://coachy.net",
	description: "Coachy is a platform for creating and selling online courses with integrated payment systems and GDPR-compliant data storage​.",
	icon: "Coachy.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "coachy:dom:0",
			kind: "dom",
			selector: "iframe[src*='embed.coachy.net/']",
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
