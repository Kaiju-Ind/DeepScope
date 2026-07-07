import type { TechnologyDefinition } from '../../types';

export const bombBombTechnologyDefinition = {
	id: "bomb-bomb",
	name: "Bomb Bomb",
	website: "https://bombbomb.com",
	description: "BombBomb is a CRM platform that integrates lead capture and video messaging to manage customer relationships and enhance engagement throughout the sales process.",
	icon: "BombBomb.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "bomb-bomb:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.bombbomb\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
