import type { TechnologyDefinition } from '../../types';

export const ramblerTechnologyDefinition = {
	id: "rambler",
	name: "Rambler",
	website: "https://www.rambler.ru",
	description: "Rambler is a site rating system and visitor counter developed in Russia.",
	icon: "Rambler.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "rambler:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("counter\\.rambler\\.ru"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "rambler:dom:1",
			kind: "dom",
			selector: "a[href*='.rambler.ru/'] > img[src*='counter.rambler.ru/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
