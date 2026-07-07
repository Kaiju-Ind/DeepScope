import type { TechnologyDefinition } from '../../types';

export const chatlioTechnologyDefinition = {
	id: "chatlio",
	name: "Chatlio",
	website: "https://chatlio.com",
	description: "Chatlio is a live chat solution that integrates with Slack, enabling real-time communication and customer support directly within the Slack platform.",
	icon: "Chatlio.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "chatlio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("w\\.chatlio\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "chatlio:jsGlobal:1",
			kind: "jsGlobal",
			property: "ChatlioReact",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "chatlio:jsGlobal:2",
			kind: "jsGlobal",
			property: "ChatlioReactDOM",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
