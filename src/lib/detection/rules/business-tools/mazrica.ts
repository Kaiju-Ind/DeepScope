import type { TechnologyDefinition } from '../../types';

export const mazricaTechnologyDefinition = {
	id: "mazrica",
	name: "Mazrica",
	website: "https://mazrica.com",
	description: "Mazrica is a sales support tool that leverages organizational knowledge, using AI algorithms to analyze accumulated sales data and evaluate success and failure cases.",
	icon: "Mazrica.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "mazrica:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.mazrica\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
