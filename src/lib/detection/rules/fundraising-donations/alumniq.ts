import type { TechnologyDefinition } from '../../types';

export const alumniqTechnologyDefinition = {
	id: "alumniq",
	name: "AlumnIQ",
	website: "https://www.alumniq.com/platform/",
	description: "AlumnIQ is a set of services to manage events, giving, email, volunteers, class agents, and more, all designed to work with your database of record.",
	icon: "AlumnIQ.svg",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "alumniq:dom:0",
			kind: "dom",
			selector: "a[href*='.alumniq.com/giving/to/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "alumniq:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^alumniq\\-online\\-giving$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
