import type { TechnologyDefinition } from '../../types';

export const chatgoTechnologyDefinition = {
	id: "chatgo",
	name: "Chatgo",
	website: "https://www.chatgo.cz",
	description: "Chatgo is a messenger widget designed for integration with websites and e-shops, enabling communication and engagement.",
	icon: "Chatgo.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "chatgo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.chatgo\\.cz"),
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
