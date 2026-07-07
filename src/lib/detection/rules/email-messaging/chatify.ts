import type { TechnologyDefinition } from '../../types';

export const chatifyTechnologyDefinition = {
	id: "chatify",
	name: "Chatify",
	website: "https://www.chatify.com",
	description: "Chatify is a chat solution for websites seeking to enhance customer engagement.",
	icon: "Chatify.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "chatify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.chatify\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
