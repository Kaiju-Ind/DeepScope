import type { TechnologyDefinition } from '../../types';

export const chatweeTechnologyDefinition = {
	id: "chatwee",
	name: "Chatwee",
	website: "https://chatwee.com",
	description: "Chatwee is a live chat and instant messaging app designed to facilitate real-time communication on websites and online communities.",
	icon: "Chatwee.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "chatwee:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\bchatwee(?:-api)?\\.com\\/.*\\.js"),
			description: "Script source URL matches a known technology marker.",
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
