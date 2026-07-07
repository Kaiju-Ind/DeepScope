import type { TechnologyDefinition } from '../../types';

export const dailykarmaTechnologyDefinition = {
	id: "dailykarma",
	name: "DailyKarma",
	website: "https://www.dailykarma.com",
	description: "DailyKarma is a turnkey cause marketing solutions for ecommerce merchants.",
	icon: "DailyKarma.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "dailykarma:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.dailykarma\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "dailykarma:jsGlobal:1",
			kind: "jsGlobal",
			property: "dkWidgetInit",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "dailykarma:jsGlobal:2",
			kind: "jsGlobal",
			property: "dk_widget",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
