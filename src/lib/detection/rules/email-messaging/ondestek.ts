import type { TechnologyDefinition } from '../../types';

export const ondestekTechnologyDefinition = {
	id: "ondestek",
	name: "Ondestek",
	website: "https://ondestek.com",
	description: "Ondestek is a live chat software that enables real-time customer communication through websites.",
	icon: "Ondestek.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "ondestek:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("panel\\.ondestek\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ondestek:jsGlobal:1",
			kind: "jsGlobal",
			property: "$ondestek",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
