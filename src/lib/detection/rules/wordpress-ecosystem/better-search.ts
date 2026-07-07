import type { TechnologyDefinition } from '../../types';

export const betterSearchTechnologyDefinition = {
	id: "better-search",
	name: "Better Search",
	website: "https://webberzone.com/plugins/better-search/",
	description: "Better Search is a WordPress plugin designed to enhance your search experience.",
	icon: "BetterSearch.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "better-search:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/better-search/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
		cpe: "cpe:2.3:a:webberzone:better_search:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
