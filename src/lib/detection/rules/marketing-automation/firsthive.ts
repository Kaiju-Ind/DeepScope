import type { TechnologyDefinition } from '../../types';

export const firsthiveTechnologyDefinition = {
	id: "firsthive",
	name: "FirstHive",
	website: "https://firsthive.com",
	description: "FirstHive is a full-stack customer data platform that enables consumer marketers and brands to take control of their first-party data from all sources.",
	icon: "FirstHive.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "firsthive:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("firsthive\\.com\\/engage\\/"),
			description: "Script source URL matches a known technology marker.",
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
