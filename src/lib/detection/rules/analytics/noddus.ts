import type { TechnologyDefinition } from '../../types';

export const noddusTechnologyDefinition = {
	id: "noddus",
	name: "Noddus",
	website: "https://www.enterprise.noddus.com",
	description: "Noddus offers brands and agencies access to an advanced proprietary content marketing platform automating content production, distribution and analytics.",
	icon: "Noddus.png",
	categories: [
		"analytics",
		"marketing-automation",
	],
	rules: [
		{
			id: "noddus:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("noddus\\.com\\/"),
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
