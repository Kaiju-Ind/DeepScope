import type { TechnologyDefinition } from '../../types';

export const sweetUpsellTechnologyDefinition = {
	id: "sweet-upsell",
	name: "Sweet Upsell",
	website: "https://sweetupsell.com",
	description: "Upsell is a tool that boosts Shopify store profits by automating product upsells.",
	icon: "SweetUpsell.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "sweet-upsell:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.sweetupsell\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
