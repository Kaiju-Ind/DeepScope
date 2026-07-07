import type { TechnologyDefinition } from '../../types';

export const tagembedTechnologyDefinition = {
	id: "tagembed",
	name: "Tagembed",
	website: "https://tagembed.com",
	description: "Tagembed is a social media aggregator that collects and displays engaging user-generated content from any social media network such as Instagram, Facebook, Twitter, Youtube, Tiktok, Google Reviews, Airbnb, and 18+ networks.",
	icon: "Tagembed.svg",
	categories: [
		"marketing-automation",
		"widgets-misc",
	],
	rules: [
		{
			id: "tagembed:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/widget\\.tagembed\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tagembed:dom:1",
			kind: "dom",
			selector: "script[data-src*='widget.tagembed.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "tagembed:jsGlobal:2",
			kind: "jsGlobal",
			property: "TagembedWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
