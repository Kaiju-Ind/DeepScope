import type { TechnologyDefinition } from '../../types';

export const jamfeedTechnologyDefinition = {
	id: "jamfeed",
	name: "JamFeed",
	website: "https://www.jamfeed.com",
	description: "JamFeed is a web-based platform that allows users to create automated music websites.",
	icon: "JamFeed.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "jamfeed:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.jamfeed\\.com"),
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
