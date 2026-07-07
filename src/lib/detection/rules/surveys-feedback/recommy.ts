import type { TechnologyDefinition } from '../../types';

export const recommyTechnologyDefinition = {
	id: "recommy",
	name: "Recommy",
	website: "https://recommy.com",
	description: "Recommy is a customer feedback gathering tool designed to collect, organize, and analyze user input to support service evaluation and improvement.",
	icon: "Recommy.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "recommy:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.recommy\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "recommy:jsGlobal:1",
			kind: "jsGlobal",
			property: "RecommyFeedbackWidget",
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
