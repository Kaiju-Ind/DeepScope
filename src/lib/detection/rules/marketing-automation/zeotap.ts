import type { TechnologyDefinition } from '../../types';

export const zeotapTechnologyDefinition = {
	id: "zeotap",
	name: "Zeotap",
	website: "https://zeotap.com",
	description: "Zeotap is a customer intelligence platform that helps brands better understand their customers and predict behaviors.",
	icon: "Zeotap.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "zeotap:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.zeotap\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "zeotap:dom:1",
			kind: "dom",
			selector: "link[href*='.zeotap.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
