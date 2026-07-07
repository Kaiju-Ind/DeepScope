import type { TechnologyDefinition } from '../../types';

export const whovaTechnologyDefinition = {
	id: "whova",
	name: "Whova",
	website: "https://whova.com",
	description: "Whova is an all-in-one event management platform supporting in-person, hybrid, and virtual events.",
	icon: "Whova.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "whova:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/whova\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "whova:header:1",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("whova\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "whova:header:2",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("whova\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
