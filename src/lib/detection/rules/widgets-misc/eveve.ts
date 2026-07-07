import type { TechnologyDefinition } from '../../types';

export const eveveTechnologyDefinition = {
	id: "eveve",
	name: "Eveve",
	website: "https://www.eveve.com",
	description: "Eveve is a restaurant table booking widget.",
	icon: "Eveve.svg",
	categories: [
		"widgets-misc",
		"booking-scheduling",
	],
	rules: [
		{
			id: "eveve:html:0",
			kind: "html",
			pattern: new RegExp("<iframe[^>]*[\\w]+\\.eveve\\.com"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "eveve:dom:1",
			kind: "dom",
			selector: "iframe[src*='.eveve.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
