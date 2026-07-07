import type { TechnologyDefinition } from '../../types';

export const paywhirlTechnologyDefinition = {
	id: "paywhirl",
	name: "PayWhirl",
	website: "https://app.paywhirl.com/",
	description: "PayWhirl provides widgets and tools to handle recurring payments.",
	icon: "paywhirl.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "paywhirl:jsGlobal:0",
			kind: "jsGlobal",
			property: "paywhirlForShopifySettings",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
