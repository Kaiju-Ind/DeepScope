import type { TechnologyDefinition } from '../../types';

export const browseeTechnologyDefinition = {
	id: "browsee",
	name: "Browsee",
	website: "https://browsee.io",
	description: "Browsee is a user behavior analytics tool that helps track and understand visitor interactions on a website.",
	icon: "Browsee.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "browsee:jsGlobal:0",
			kind: "jsGlobal",
			property: "_browsee.apiKey",
			description: "Page-owned global matches a known technology marker.",
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
