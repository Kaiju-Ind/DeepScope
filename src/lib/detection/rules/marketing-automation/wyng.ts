import type { TechnologyDefinition } from '../../types';

export const wyngTechnologyDefinition = {
	id: "wyng",
	name: "Wyng",
	website: "https://www.wyng.com",
	description: "Wyng is a platform that connects audiences and drives consumer actions across various marketing channels.",
	icon: "Wyng.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "wyng:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.offerpop\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wyng:dom:1",
			kind: "dom",
			selector: "iframe[src*='//offerpop.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
