import type { TechnologyDefinition } from '../../types';

export const vecteraTechnologyDefinition = {
	id: "vectera",
	name: "Vectera",
	website: "https://go.vectera.com",
	description: "Vectera is an online client meeting booking system that enables scheduling, managing, and organizing virtual appointments through a web-based platform.",
	icon: "Vectera.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "vectera:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("www\\.vectera\\.com"),
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
