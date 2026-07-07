import type { TechnologyDefinition } from '../../types';

export const smartypilotTechnologyDefinition = {
	id: "smartypilot",
	name: "Smartypilot",
	website: "https://smartypilot.ai",
	description: "Smartypilot is an ecommerce AI suite that provides semantic search, chatbot assistance, and product question answering.",
	icon: "Smartypilot.png",
	categories: [
		"search",
	],
	rules: [
		{
			id: "smartypilot:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("hub\\.smartypilot\\.ai\\/smartypilot-(chatbot-)?lib\\/"),
			description: "Script source URL matches a known technology marker.",
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
