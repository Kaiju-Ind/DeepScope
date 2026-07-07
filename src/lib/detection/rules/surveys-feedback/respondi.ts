import type { TechnologyDefinition } from '../../types';

export const respondiTechnologyDefinition = {
	id: "respondi",
	name: "Respondi",
	website: "https://respondi.app",
	description: "Respondi is a tool for creating forms, including surveys, questionnaires, quizzes, and other custom data collection formats.",
	icon: "Respondi.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "respondi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("embed\\.respondi\\.app"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "respondi:jsGlobal:1",
			kind: "jsGlobal",
			property: "respondiElement",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
