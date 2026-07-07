import type { TechnologyDefinition } from '../../types';

export const graphyTechnologyDefinition = {
	id: "graphy",
	name: "Graphy",
	website: "https://graphy.com",
	description: "Graphy is a platform that enables the creation and scaling of courses, communities, and digital products using AI tools.",
	icon: "Graphy.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "graphy:jsGlobal:0",
			kind: "jsGlobal",
			property: "getGraphyCookie",
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
