import type { TechnologyDefinition } from '../../types';

export const tixTechnologyDefinition = {
	id: "tix",
	name: "Tix",
	website: "https://www.tix.com",
	description: "Tix is a system designed for managing event tickets, allowing users to organize, distribute, and track tickets.",
	icon: "Tix.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "tix:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.secure-tix\\.com\\/"),
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
