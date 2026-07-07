import type { TechnologyDefinition } from '../../types';

export const conferWithTechnologyDefinition = {
	id: "confer-with",
	name: "Confer With",
	website: "https://conferwith.io",
	description: "Confer With triggers live streaming video calls between shoppers and instore experts from a website, or outside a store.",
	icon: "Confer With.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "confer-with:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.conferwith\\.io\\/"),
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
