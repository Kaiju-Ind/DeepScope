import type { TechnologyDefinition } from '../../types';

export const fastmindTechnologyDefinition = {
	id: "fastmind",
	name: "Fastmind",
	website: "https://fastmind.ai",
	description: "Fastmind is an AI-powered chatbot builder that enables customer engagement using live data retrieved directly from a search engine.",
	icon: "Fastmind.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "fastmind:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.fastmind\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
