import type { TechnologyDefinition } from '../../types';

export const twyneTechnologyDefinition = {
	id: "twyne",
	name: "Twyne",
	website: "https://twyne.io",
	description: "Twyne is an advanced lead management, lead optimization, lead distribution and monetization platform with analytics.",
	icon: "Twyne.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "twyne:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.twyne\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "twyne:jsGlobal:1",
			kind: "jsGlobal",
			property: "twyne.alreadyLoadAnura",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"high",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
