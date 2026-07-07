import type { TechnologyDefinition } from '../../types';

export const stylaTechnologyDefinition = {
	id: "styla",
	name: "Styla",
	website: "https://www.styla.com",
	description: "Styla is a content commerce suite that automatically designs content and integrates shopping features, enhancing customer engagement and driving sales.",
	icon: "Styla.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "styla:jsGlobal:0",
			kind: "jsGlobal",
			property: "styla.init",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
