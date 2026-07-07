import type { TechnologyDefinition } from '../../types';

export const molinAiTechnologyDefinition = {
	id: "molin-ai",
	name: "Molin AI",
	website: "https://molin.ai",
	description: "Molin AI is a multilingual tool that reduces support volume by 70%, recommends relevant products to shoppers, and uses up-to-date information from client websites to enhance store revenue.",
	icon: "MolinAI.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "molin-ai:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.molin\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "molin-ai:jsGlobal:1",
			kind: "jsGlobal",
			property: "__INIT_MOLIN_SHOP_AI",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "molin-ai:jsGlobal:2",
			kind: "jsGlobal",
			property: "__INIT_MOLIN_SHOP_AI_OPTIONS",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
