import type { TechnologyDefinition } from '../../types';

export const thorMediaTechnologyDefinition = {
	id: "thor-media",
	name: "Thor-Media",
	website: "https://thor-media.ru",
	description: "Thor-Media is a Russian-based affiliate advertising system that connects advertisers with affiliates for performance-based marketing campaigns.",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "thor-media:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("t\\.thor-media\\.ru\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
