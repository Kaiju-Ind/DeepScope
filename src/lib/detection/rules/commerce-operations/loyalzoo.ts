import type { TechnologyDefinition } from '../../types';

export const loyalzooTechnologyDefinition = {
	id: "loyalzoo",
	name: "Loyalzoo",
	website: "https://loyalzoo.com",
	description: "Loyalzoo is a platform that enables businesses to manage customer loyalty, marketing campaigns, and subscription services.",
	icon: "Loyalzoo.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "loyalzoo:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.loyalzoo\\.com"),
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
