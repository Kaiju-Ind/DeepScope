import type { TechnologyDefinition } from '../../types';

export const musculaTechnologyDefinition = {
	id: "muscula",
	name: "Muscula",
	website: "https://www.muscula.com/",
	description: "Muscula is an error logging solution that collects and analyzes errors for websites or applications, providing actionable insights.",
	icon: "Muscula.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "muscula:jsGlobal:0",
			kind: "jsGlobal",
			property: "Muscula.settings",
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
