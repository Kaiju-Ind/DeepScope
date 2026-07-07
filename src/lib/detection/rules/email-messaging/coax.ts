import type { TechnologyDefinition } from '../../types';

export const coaxTechnologyDefinition = {
	id: "coax",
	name: "Coax",
	website: "https://coax.com.au",
	description: "Coax is a communication platform that consolidates chat histories from multiple channels to improve business communication and customer service.",
	icon: "Coax.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "coax:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.coax\\.com\\.au"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "coax:jsGlobal:1",
			kind: "jsGlobal",
			property: "coaxAppStorage",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "coax:jsGlobal:2",
			kind: "jsGlobal",
			property: "coaxCurrentWebDomain",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "coax:jsGlobal:3",
			kind: "jsGlobal",
			property: "openCoaxWidget",
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
