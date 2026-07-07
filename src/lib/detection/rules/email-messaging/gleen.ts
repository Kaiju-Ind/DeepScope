import type { TechnologyDefinition } from '../../types';

export const gleenTechnologyDefinition = {
	id: "gleen",
	name: "Gleen",
	website: "https://gleen.ai",
	description: "Gleen is a generative AI chatbot designed to provide customers with trustworthy answers, automate actions, and integrate unified knowledge.",
	icon: "Gleen.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "gleen:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.gleen\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "gleen:jsGlobal:1",
			kind: "jsGlobal",
			property: "gleenWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
