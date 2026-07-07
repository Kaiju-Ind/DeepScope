import type { TechnologyDefinition } from '../../types';

export const chatwayTechnologyDefinition = {
	id: "chatway",
	name: "Chatway",
	website: "https://chatway.app",
	description: "Chatway is a live chat tool for websites, designed to facilitate customer engagement through real-time conversations.",
	icon: "Chatway.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "chatway:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.chatway\\.app\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "chatway:jsGlobal:1",
			kind: "jsGlobal",
			property: "$chatway",
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
