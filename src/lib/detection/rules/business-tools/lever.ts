import type { TechnologyDefinition } from '../../types';

export const leverTechnologyDefinition = {
	id: "lever",
	name: "Lever",
	website: "https://www.lever.co",
	description: "Lever is a software company headquartered in San Francisco, California and Toronto, Canada that provides an applicant tracking system for hiring.",
	icon: "Lever.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "lever:dom:0",
			kind: "dom",
			selector: "a[href*='jobs.lever.co/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "lever:header:1",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.lever\\.co", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "lever:header:2",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.lever\\.co", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
