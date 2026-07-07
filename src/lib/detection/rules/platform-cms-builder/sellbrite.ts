import type { TechnologyDefinition } from '../../types';

export const sellbriteTechnologyDefinition = {
	id: "sellbrite",
	name: "Sellbrite",
	website: "https://www.sellbrite.com",
	description: "Sellbrite is a platform that enables brands and retailers to list and sell products across major online marketplaces.",
	icon: "Sellbrite.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sellbrite:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.sellbrite\\.com"),
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
