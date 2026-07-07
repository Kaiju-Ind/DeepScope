import type { TechnologyDefinition } from '../../types';

export const rePlainTechnologyDefinition = {
	id: "re-plain",
	name: "Re:plain",
	website: "https://replain.cc",
	description: "Re:plain is a live chat integration for WhatsApp, Facebook Messenger, and Telegram, allowing you to connect live chat to your website.",
	icon: "Replain.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "re-plain:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.replain\\.cc\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "re-plain:jsGlobal:1",
			kind: "jsGlobal",
			property: "replainInitialized",
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
