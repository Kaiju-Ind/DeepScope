import type { TechnologyDefinition } from '../../types';

export const plivoTechnologyDefinition = {
	id: "plivo",
	name: "Plivo",
	website: "https://www.plivo.com",
	description: "Plivo is a global platform that provides SMS and voice call services for businesses of all sizes to connect with customers worldwide.",
	icon: "Plivo.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "plivo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.plivo\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
