import type { TechnologyDefinition } from '../../types';

export const samedayTechnologyDefinition = {
	id: "sameday",
	name: "Sameday",
	website: "https://www.gosameday.com",
	description: "Sameday is an AI-powered platform that provides automated phone answering and communication services for home service businesses.",
	icon: "Sameday.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "sameday:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.sameday\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
