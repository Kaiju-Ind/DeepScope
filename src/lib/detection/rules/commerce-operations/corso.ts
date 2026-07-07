import type { TechnologyDefinition } from '../../types';

export const corsoTechnologyDefinition = {
	id: "corso",
	name: "Corso",
	website: "https://corso.com",
	description: "Corso is an all-in-one platform for Shopify that provides shipping protection, returns, exchanges, and warranty management to streamline post-purchase processes.",
	icon: "Corso.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "corso:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.corso\\.com"),
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
