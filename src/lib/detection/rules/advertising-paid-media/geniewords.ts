import type { TechnologyDefinition } from '../../types';

export const geniewordsTechnologyDefinition = {
	id: "geniewords",
	name: "GenieWords",
	website: "https://geniewords.com",
	description: "GenieWords is a tool that simplifies the process of advertising with Google Ads.",
	icon: "GenieWords.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "geniewords:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("admin\\.geniewords\\.com\\/"),
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
