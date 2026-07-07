import type { TechnologyDefinition } from '../../types';

export const zeaburTechnologyDefinition = {
	id: "zeabur",
	name: "Zeabur",
	website: "https://zeabur.com",
	description: "Zeabur is a platform for running full stack apps and databases.",
	icon: "zeabur.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [],
	metadata: {
		pricing: [
			"freemium",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
