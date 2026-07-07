import type { TechnologyDefinition } from '../../types';

export const mymaTechnologyDefinition = {
	id: "myma",
	name: "Myma",
	website: "https://www.myma.ai",
	description: "Myma is an AI-powered multi-channel chatbot designed for hotels, enabling automated guest interactions across various communication platforms.",
	icon: "Myma.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "myma:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("messenger\\.myma\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
