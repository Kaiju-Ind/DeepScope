import type { TechnologyDefinition } from '../../types';

export const marchexTechnologyDefinition = {
	id: "marchex",
	name: "Marchex",
	website: "https://www.marchex.com",
	description: "Marchex is a B2B call and conversational analytics company.",
	icon: "Marchex.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "marchex:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.marchex\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "marchex:dom:1",
			kind: "dom",
			selector: "link[href*='.marchex.io']",
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
} as const satisfies TechnologyDefinition;
