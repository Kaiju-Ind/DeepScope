import type { TechnologyDefinition } from '../../types';

export const enjoreTechnologyDefinition = {
	id: "enjore",
	name: "Enjore",
	website: "https://www.enjore.com",
	description: "Enjore is an online sports administration system designed to manage schedules, results, statistics, and news for all leagues and tournaments.",
	icon: "Enjore.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "enjore:dom:0",
			kind: "dom",
			selector: "link[href*='cdn.enjore.com/']",
			description: "DOM selector matches a known technology marker.",
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
		"addtoany",
		"php",
	],
} as const satisfies TechnologyDefinition;
