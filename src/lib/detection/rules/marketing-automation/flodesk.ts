import type { TechnologyDefinition } from '../../types';

export const flodeskTechnologyDefinition = {
	id: "flodesk",
	name: "Flodesk",
	website: "https://flodesk.com",
	description: "Flodesk is an email marketing platform that supports campaign creation, scheduling, and performance analysis using automation.",
	icon: "Flodesk.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "flodesk:jsGlobal:0",
			kind: "jsGlobal",
			property: "FlodeskObject",
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
