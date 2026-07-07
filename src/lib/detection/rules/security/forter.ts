import type { TechnologyDefinition } from '../../types';

export const forterTechnologyDefinition = {
	id: "forter",
	name: "Forter",
	website: "https://www.forter.com",
	description: "Forter is a SaaS company that provides fraud prevention technology for online retailers and marketplaces.",
	icon: "Forter.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "forter:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("forter\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "forter:jsGlobal:1",
			kind: "jsGlobal",
			property: "ftr__startScriptLoad",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "forter:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^forterToken$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "forter:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^fortertoken$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
