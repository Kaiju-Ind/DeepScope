import type { TechnologyDefinition } from '../../types';

export const soplanningTechnologyDefinition = {
	id: "soplanning",
	name: "SOPlanning",
	website: "https://www.soplanning.org/en/",
	description: "SOPlanning is an online project management software that enhances team visibility and facilitates task coordination through a centralized platform.",
	icon: "SOPlanning.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "soplanning:meta:0",
			kind: "meta",
			key: "email",
			valuePattern: new RegExp("^support@soplanning\\.org$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"poa",
			"recurring",
		],
		cpe: "cpe:2.3:a:soplanning:soplanning:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
