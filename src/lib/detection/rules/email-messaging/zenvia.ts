import type { TechnologyDefinition } from '../../types';

export const zenviaTechnologyDefinition = {
	id: "zenvia",
	name: "Zenvia",
	website: "https://www.zenvia.com",
	description: "Zenvia is a customer engagement platform that enables businesses to communicate with clients through multiple digital channels.",
	icon: "Zenvia.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "zenvia:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.zenvia\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "zenvia:jsGlobal:1",
			kind: "jsGlobal",
			property: "ZenviaChat",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"high",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
