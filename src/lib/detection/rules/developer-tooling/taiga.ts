import type { TechnologyDefinition } from '../../types';

export const taigaTechnologyDefinition = {
	id: "taiga",
	name: "Taiga",
	website: "https://taiga.io",
	description: "Taiga is an open-source agile project management software that supports Scrum and Kanban methodologies for cross-functional teams.",
	icon: "Taiga.png",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "taiga:jsGlobal:0",
			kind: "jsGlobal",
			property: "taigaConfig",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
	implies: [
		"angularjs",
		"django",
	],
} as const satisfies TechnologyDefinition;
