import type { TechnologyDefinition } from '../../types';

export const brandquizTechnologyDefinition = {
	id: "brandquiz",
	name: "Brandquiz",
	website: "https://www.brandquiz.io",
	description: "Brandquiz is a platform for creating quizzes and surveys to capture leads, collect feedback, and engage audiences.",
	icon: "Brandquiz.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "brandquiz:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.brandquiz\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "brandquiz:jsGlobal:1",
			kind: "jsGlobal",
			property: "brandquizEmbed",
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
