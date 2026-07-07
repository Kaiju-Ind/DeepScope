import type { TechnologyDefinition } from '../../types';

export const virtuousTechnologyDefinition = {
	id: "virtuous",
	name: "Virtuous",
	website: "https://virtuous.org",
	description: "Virtuous is the responsive fundraising software platform.",
	icon: "Virtuous.svg",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "virtuous:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.virtuoussoftware\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
