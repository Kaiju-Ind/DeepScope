import type { TechnologyDefinition } from '../../types';

export const eatselfTechnologyDefinition = {
	id: "eatself",
	name: "Eatself",
	website: "https://www.eatself.com",
	description: "Eatself is an online platform that facilitates meal ordering and delivery services.",
	icon: "Eatself.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "eatself:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.eatself\\.com"),
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
