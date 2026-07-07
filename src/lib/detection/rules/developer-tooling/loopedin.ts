import type { TechnologyDefinition } from '../../types';

export const loopedinTechnologyDefinition = {
	id: "loopedin",
	name: "LoopedIn",
	website: "https://www.loopedin.io",
	description: "LoopedIn is an all-in-one tool for collecting feedback, building roadmaps, sharing changelogs, and publishing knowledge bases.",
	icon: "LoopedIn.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "loopedin:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.productstash\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
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
