import type { TechnologyDefinition } from '../../types';

export const trueTechnologyDefinition = {
	id: "true",
	name: "true",
	website: "https://usetrue.com",
	description: "true is a social proof platform that helps organizations increase conversions and credibility by displaying verified user interactions and trust signals on digital properties.",
	icon: "true.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "true:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.usetrue\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "true:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.usetrue\\.com"),
			description: "Script content contains a bounded technology signature.",
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
