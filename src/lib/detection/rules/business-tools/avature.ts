import type { TechnologyDefinition } from '../../types';

export const avatureTechnologyDefinition = {
	id: "avature",
	name: "Avature",
	website: "https://www.avature.net",
	description: "Avature is a talent acquisition and talent management platform that provides solutions for recruitment, onboarding, and employee engagement.",
	icon: "Avature.svg",
	categories: [
		"business-tools",
	],
	rules: [],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
