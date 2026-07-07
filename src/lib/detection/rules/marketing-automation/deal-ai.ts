import type { TechnologyDefinition } from '../../types';

export const dealAiTechnologyDefinition = {
	id: "deal-ai",
	name: "Deal.ai",
	website: "https://home.deal.ai",
	description: "Deal.ai is an AI-powered white-label platform designed to support marketing, content creation, and business growth.",
	icon: "DealAI.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "deal-ai:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.marketing\\.deal\\.ai"),
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
