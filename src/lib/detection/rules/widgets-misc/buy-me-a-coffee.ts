import type { TechnologyDefinition } from '../../types';

export const buyMeACoffeeTechnologyDefinition = {
	id: "buy-me-a-coffee",
	name: "Buy me a coffee",
	website: "https://www.buymeacoffee.com",
	description: "Buy me a coffee is a service for online content creators that they may use to receive tips and donations to support their work.",
	icon: "Buy me a coffee.svg",
	categories: [
		"widgets-misc",
		"fundraising-donations",
	],
	rules: [
		{
			id: "buy-me-a-coffee:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdnjs\\.buymeacoffee\\.com\\/([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "buy-me-a-coffee:dom:1",
			kind: "dom",
			selector: "a[href*='www.buymeacoffee.com/'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
