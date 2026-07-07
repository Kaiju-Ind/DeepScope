import type { TechnologyDefinition } from '../../types';

export const superstatsTechnologyDefinition = {
	id: "superstats",
	name: "SuperStats",
	website: "https://superstats.com",
	description: "SuperStats is a tool that provides in-depth website traffic statistics for tracking and analyzing web performance.",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "superstats:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("code\\.superstats\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
