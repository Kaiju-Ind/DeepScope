import type { TechnologyDefinition } from '../../types';

export const dialogityTechnologyDefinition = {
	id: "dialogity",
	name: "Dialogity",
	website: "https://dialogity.com",
	description: "Dialogity Chat is a customer service chatbot platform.",
	icon: "Dialogity.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "dialogity:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.dialogity\\.com"),
			description: "Script source URL matches a known technology marker.",
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
