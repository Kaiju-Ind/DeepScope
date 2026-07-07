import type { TechnologyDefinition } from '../../types';

export const dotdigitalChatTechnologyDefinition = {
	id: "dotdigital-chat",
	name: "Dotdigital Chat",
	website: "https://dotdigital.com",
	description: "Dotdigital Chat is a smart, customisable widget that makes it easy for shoppers to communicate in real-time with members of your team.",
	icon: "Dotdigital.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "dotdigital-chat:jsGlobal:0",
			kind: "jsGlobal",
			property: "_ddgChatConfig.urlBase",
			valuePattern: new RegExp("\\.dotdigital\\.com"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	implies: [
		"dotdigital",
	],
} as const satisfies TechnologyDefinition;
