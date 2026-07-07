import type { TechnologyDefinition } from '../../types';

export const kurocoTechnologyDefinition = {
	id: "kuroco",
	name: "Kuroco",
	website: "https://kuroco.app",
	description: "Kuroco is an API-centric platform that enables developers to create customizable APIs, manage content, and leverage a CDN for fast content delivery across various devices.",
	icon: "Kuroco.svg",
	categories: [
		"developer-tooling",
	],
	rules: [],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
