import type { TechnologyDefinition } from '../../types';

export const pocketTechnologyDefinition = {
	id: "pocket",
	name: "Pocket",
	website: "https://getpocket.com",
	description: "Pocket is a social bookmarking service that can be integrated into a website with the use of a web widget.",
	icon: "pocket.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "pocket:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widgets\\.getpocket\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pocket:dom:1",
			kind: "dom",
			selector: "iframe[src*='widgets.getpocket.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
