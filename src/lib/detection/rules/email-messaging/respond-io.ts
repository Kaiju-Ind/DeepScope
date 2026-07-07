import type { TechnologyDefinition } from '../../types';

export const respondIoTechnologyDefinition = {
	id: "respond-io",
	name: "Respond.io",
	website: "https://www.respond.io",
	description: "Respond.io is an AI-powered customer conversation management software.",
	icon: "RespondIO.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "respond-io:dom:0",
			kind: "dom",
			selector: "script#respondio__growth_tool",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "respond-io:jsGlobal:1",
			kind: "jsGlobal",
			property: "$__respond",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "respond-io:jsGlobal:2",
			kind: "jsGlobal",
			property: "$respond",
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
