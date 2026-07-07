import type { TechnologyDefinition } from '../../types';

export const wobilyTechnologyDefinition = {
	id: "wobily",
	name: "Wobily",
	website: "https://www.wobily.com",
	description: "Wobily is an Israel-based store builder system for creating and managing online shops.",
	icon: "Wobily.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "wobily:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdnw\\.wobily\\.com\\/"),
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
