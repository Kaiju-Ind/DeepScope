import type { TechnologyDefinition } from '../../types';

export const dropAHintTechnologyDefinition = {
	id: "drop-a-hint",
	name: "Drop A Hint",
	website: "https://apps.shopify.com/drop-a-hint-v2",
	description: "Drop A Hint is an Shopify app which help share hints via email, SMS, WhatsApp and messengers.",
	icon: "Drop A Hint.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "drop-a-hint:jsGlobal:0",
			kind: "jsGlobal",
			property: "DropAHint.BaseURL",
			valuePattern: new RegExp("dropahint\\.love\\/"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "drop-a-hint:jsGlobal:1",
			kind: "jsGlobal",
			property: "dropAHintTypeProduct",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
