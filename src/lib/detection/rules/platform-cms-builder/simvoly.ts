import type { TechnologyDefinition } from '../../types';

export const simvolyTechnologyDefinition = {
	id: "simvoly",
	name: "Simvoly",
	website: "https://simvoly.com",
	description: "Simvoly is a drag-and-drop website builder for small and medium-sized businesses, agencies, and freelancers.",
	icon: "Simvoly.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "simvoly:jsGlobal:0",
			kind: "jsGlobal",
			property: "Simvoly",
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
