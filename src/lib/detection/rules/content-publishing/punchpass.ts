import type { TechnologyDefinition } from '../../types';

export const punchpassTechnologyDefinition = {
	id: "punchpass",
	name: "Punchpass",
	website: "https://punchpass.com",
	description: "Punchpass is a class management system designed to organize schedules, track attendance, and manage client information.",
	icon: "Punchpass.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "punchpass:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.punchpass\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "punchpass:jsGlobal:1",
			kind: "jsGlobal",
			property: "punchpassForm",
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
