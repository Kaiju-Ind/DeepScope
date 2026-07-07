import type { TechnologyDefinition } from '../../types';

export const pinpollTechnologyDefinition = {
	id: "pinpoll",
	name: "Pinpoll",
	website: "https://www.pinpoll.com",
	description: "Pinpoll is a tool that collects contact data from users for analytics, marketing, or customer engagement purposes.",
	icon: "Pinpoll.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "pinpoll:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.pinpoll\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
