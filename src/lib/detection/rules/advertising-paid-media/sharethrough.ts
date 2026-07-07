import type { TechnologyDefinition } from '../../types';

export const sharethroughTechnologyDefinition = {
	id: "sharethrough",
	name: "Sharethrough",
	website: "https://www.sharethrough.com",
	description: "Sharethrough is a software company that powers in-feed advertising for brands and publishers.",
	icon: "Sharethrough.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "sharethrough:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.sharethrough\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sharethrough:dom:1",
			kind: "dom",
			selector: "link[href*='.sharethrough.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
