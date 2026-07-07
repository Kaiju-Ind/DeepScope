import type { TechnologyDefinition } from '../../types';

export const platformlyTechnologyDefinition = {
	id: "platformly",
	name: "Platformly",
	website: "https://www.platformly.com",
	description: "Platformly is a tool that provides intelligent marketing automation for online businesses.",
	icon: "Platformly.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "platformly:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.platform\\.ly\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
