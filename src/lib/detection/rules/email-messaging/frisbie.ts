import type { TechnologyDefinition } from '../../types';

export const frisbieTechnologyDefinition = {
	id: "frisbie",
	name: "Frisbie",
	website: "https://frisbie.me",
	description: "Frisbie is a Russian chat widget designed for online communication.",
	icon: "Frisbie.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "frisbie:jsGlobal:0",
			kind: "jsGlobal",
			property: "Frisbie.app",
			description: "Page-owned global matches a known technology marker.",
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
