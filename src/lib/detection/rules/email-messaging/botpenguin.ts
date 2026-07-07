import type { TechnologyDefinition } from '../../types';

export const botpenguinTechnologyDefinition = {
	id: "botpenguin",
	name: "BotPenguin",
	website: "https://botpenguin.com",
	description: "BotPenguin is an AI chatbot creator for websites, WhatsApp, Facebook, and Telegram.",
	icon: "BotPenguin.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "botpenguin:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.botpenguin\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "botpenguin:jsGlobal:1",
			kind: "jsGlobal",
			property: "BotPenguin",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "botpenguin:jsGlobal:2",
			kind: "jsGlobal",
			property: "BotPenguinWindow",
			description: "Page-owned global matches a known technology marker.",
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
