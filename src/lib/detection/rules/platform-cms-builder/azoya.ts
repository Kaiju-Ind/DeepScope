import type { TechnologyDefinition } from '../../types';

export const azoyaTechnologyDefinition = {
	id: "azoya",
	name: "Azoya",
	website: "https://www.azoyagroup.com",
	description: "Azoya helps international brands and retailers sell directly to Chinese consumers through cross-border ecommerce.",
	icon: "Azoya.svg",
	categories: [
		"platform-cms-builder",
		"commerce-operations",
	],
	rules: [
		{
			id: "azoya:jsGlobal:0",
			kind: "jsGlobal",
			property: "IMAGE_CDN_HOST",
			valuePattern: new RegExp("\\.azoyacdn\\.com"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"poa",
			"recurring",
		],
	},
	excludes: [
		"magento",
	],
} as const satisfies TechnologyDefinition;
