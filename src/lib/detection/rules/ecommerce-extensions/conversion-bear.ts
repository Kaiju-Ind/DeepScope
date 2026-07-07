import type { TechnologyDefinition } from '../../types';

export const conversionBearTechnologyDefinition = {
	id: "conversion-bear",
	name: "Conversion Bear",
	website: "https://www.conversionbear.com",
	description: "Conversion Bear is a Shopify app providing trust badges and sticky add-to-cart features to enhance store credibility and streamline the purchasing process.",
	icon: "ConversionBear.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "conversion-bear:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.conversionbear\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
