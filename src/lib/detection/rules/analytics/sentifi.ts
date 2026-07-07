import type { TechnologyDefinition } from '../../types';

export const sentifiTechnologyDefinition = {
	id: "sentifi",
	name: "Sentifi",
	website: "https://sentifi.com",
	description: "Sentifi is a platform that leverages crowd-based financial intelligence to analyze and provide insights into market trends, helping users make informed decisions based on collective data.",
	icon: "Sentifi.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "sentifi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn-pub\\.sentifi\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
