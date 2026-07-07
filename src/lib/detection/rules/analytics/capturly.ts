import type { TechnologyDefinition } from '../../types';

export const capturlyTechnologyDefinition = {
	id: "capturly",
	name: "Capturly",
	website: "https://capturly.com",
	description: "Capturly is an online analytics platform for businesses to analyze user behavior, identify issues, improve conversion rates, and enhance sales.",
	icon: "Capturly.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "capturly:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("capturly-track-js\\.js"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
