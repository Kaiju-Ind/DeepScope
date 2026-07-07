import type { TechnologyDefinition } from '../../types';

export const podkiteTechnologyDefinition = {
	id: "podkite",
	name: "Podkite",
	website: "https://podkite.com",
	description: "Podkite is a platform that allows users to track their podcast's chart rankings, reviews, download analytics and attribution data all in one place.",
	icon: "Podkite.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "podkite:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("embed\\.podkite\\.com\\/"),
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
