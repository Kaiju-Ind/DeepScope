import type { TechnologyDefinition } from '../../types';

export const pusheTechnologyDefinition = {
	id: "pushe",
	name: "Pushe",
	website: "https://pushe.co",
	description: "Pushe is a push notification system designed for real-time message delivery and user engagement across web and mobile platforms.",
	icon: "Pushe.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "pushe:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.pushe\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pushe:jsGlobal:1",
			kind: "jsGlobal",
			property: "Pushe.EVENTS",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
