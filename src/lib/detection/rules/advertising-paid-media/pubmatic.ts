import type { TechnologyDefinition } from '../../types';

export const pubmaticTechnologyDefinition = {
	id: "pubmatic",
	name: "PubMatic",
	website: "https://www.pubmatic.com/",
	description: "PubMatic is a company that develops and implements online advertising software and strategies for the digital publishing and advertising industry.",
	icon: "PubMatic.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "pubmatic:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("https?:\\/\\/[^/]*\\.pubmatic\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pubmatic:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("\\.pubmatic\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "pubmatic:dom:2",
			kind: "dom",
			selector: "iframe[src*='.pubmatic.com'], link[href*='.pubmatic.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
