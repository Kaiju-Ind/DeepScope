import type { TechnologyDefinition } from '../../types';

export const impressureTechnologyDefinition = {
	id: "impressure",
	name: "Impressure",
	website: "https://impressure.io",
	description: "Impressure is a platform for creating and publishing offer paths, dynamic forms, and surveys through a user-friendly interface.",
	icon: "Impressure.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "impressure:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("events\\.impressure\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "impressure:jsGlobal:1",
			kind: "jsGlobal",
			property: "Impressure.commands",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
