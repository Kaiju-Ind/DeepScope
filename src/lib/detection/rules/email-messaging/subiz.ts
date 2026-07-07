import type { TechnologyDefinition } from '../../types';

export const subizTechnologyDefinition = {
	id: "subiz",
	name: "Subiz",
	website: "https://subiz.com.vn",
	description: "Subiz is a live chat solution that consolidates all customer messages into a single screen for communication on websites.",
	icon: "Subiz.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "subiz:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.subiz\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "subiz:jsGlobal:1",
			kind: "jsGlobal",
			property: "subiz",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
