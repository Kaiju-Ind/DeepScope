import type { TechnologyDefinition } from '../../types';

export const tidioTechnologyDefinition = {
	id: "tidio",
	name: "Tidio",
	website: "https://www.tidio.com",
	description: "Tidio is a customer communication product. It provides multi-channel support so users can communicate with customers on the go. Live chat, messenger, or email are all supported.",
	icon: "Tidio.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "tidio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("code\\.tidio\\.co"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tidio:jsGlobal:1",
			kind: "jsGlobal",
			property: "tidioChatApi",
			description: "Page-owned global matches a known technology marker.",
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
