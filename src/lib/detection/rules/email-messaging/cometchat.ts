import type { TechnologyDefinition } from '../../types';

export const cometchatTechnologyDefinition = {
	id: "cometchat",
	name: "CometChat",
	website: "https://www.cometchat.com",
	description: "CometChat is a SaaS solution that provides apps and websites with scalable text, voice, and video chat functionality.",
	icon: "CometChat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "cometchat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget-js\\.cometchat\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"payg",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
