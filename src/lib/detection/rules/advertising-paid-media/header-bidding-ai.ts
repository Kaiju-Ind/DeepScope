import type { TechnologyDefinition } from '../../types';

export const headerBiddingAiTechnologyDefinition = {
	id: "header-bidding-ai",
	name: "Header Bidding Ai",
	website: "https://headerbidding.ai",
	description: "Header Bidding Ai is a provider of an automated and managed header bidding solution. Header bidding cutting-edge technique where publishers offer their ad inventory to many ad exchanges.",
	icon: "Header Bidding Ai.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "header-bidding-ai:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.headerbidding\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
