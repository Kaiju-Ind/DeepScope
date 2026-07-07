import type { TechnologyDefinition } from '../../types';

export const nestifyTechnologyDefinition = {
	id: "nestify",
	name: "Nestify",
	website: "https://nestify.io",
	description: "Nestify is a fully managed WordPress hosting platform that runs on AWS graviton processors.",
	icon: "Nestify.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [],
	metadata: {
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
