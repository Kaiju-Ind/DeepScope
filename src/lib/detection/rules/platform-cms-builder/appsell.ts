import type { TechnologyDefinition } from '../../types';

export const appsellTechnologyDefinition = {
	id: "appsell",
	name: "AppSell",
	website: "https://appsell.io",
	description: "AppSell is a cross-selling app designed for Wix that helps online stores recommend additional products to customers based on their shopping behavior, potentially increasing sales and improving customer engagement.",
	icon: "AppSell.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "appsell:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("AppSell - Upsell & Cross Sell"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "appsell:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("appsell - upsell & cross sell"),
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
} as const satisfies TechnologyDefinition;
