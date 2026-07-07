import type { TechnologyDefinition } from '../../types';

export const kxAiSearchAndDiscoveryAgentTechnologyDefinition = {
	id: "kx-ai-search-and-discovery-agent",
	name: "Kx AI Search & Discovery Agent",
	website: "https://apps.shopify.com/agentic-store",
	description: "Kx AI Search & Discovery Agent is an agentic search solution that interprets product data, collections, attributes, inventory, margins, and shopper intent to support product discovery and conversion optimization.",
	icon: "KxAISearchDiscoveryAgent.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "kx-ai-search-and-discovery-agent:dom:0",
			kind: "dom",
			selector: "div#kxChatSearchBubbleBtn",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
