import type { TechnologyDefinition } from '../../types';

export const boatchatTechnologyDefinition = {
	id: "boatchat",
	name: "BoatChat",
	website: "https://www.boatchat.com",
	description: "BoatChat is a customer service tool that provides live chat support for inquiries and assistance related to boat dealerships.",
	icon: "BoatChat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "boatchat:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.boatchat\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
