import type { TechnologyDefinition } from '../../types';

export const aitrillionTechnologyDefinition = {
	id: "aitrillion",
	name: "AiTrillion",
	website: "https://www.aitrillion.com",
	description: "AiTrillion is a marketing automation platform for ecommerce, offering tools for email campaigns, customer segmentation, loyalty programs, and product recommendations.",
	icon: "AiTrillion.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "aitrillion:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.aitrillion\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "aitrillion:jsGlobal:1",
			kind: "jsGlobal",
			property: "aioAccessModule",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "aitrillion:jsGlobal:2",
			kind: "jsGlobal",
			property: "aioMeta.meta_e",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
