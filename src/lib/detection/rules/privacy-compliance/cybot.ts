import type { TechnologyDefinition } from '../../types';

export const cybotTechnologyDefinition = {
	id: "cybot",
	name: "Cybot",
	website: "https://www.cybot.com/",
	description: "Cybot is a tool that facilitates compliance with data privacy laws for website operators and marketers.",
	icon: "Cybot.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "cybot:dom:0",
			kind: "dom",
			selector: "div#CybotCookiebotDialog",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
