import type { TechnologyDefinition } from '../../types';

export const pingParrotTechnologyDefinition = {
	id: "ping-parrot",
	name: "Ping Parrot",
	website: "https://www.pingparrot.com",
	description: "Ping Parrot is an AI powered chatbot that allows any website to create a bot that is trained on their data.",
	icon: "PingParrot.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "ping-parrot:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.pingparrot\\.com\\/"),
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
