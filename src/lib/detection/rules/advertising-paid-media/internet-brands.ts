import type { TechnologyDefinition } from '../../types';

export const internetBrandsTechnologyDefinition = {
	id: "internet-brands",
	name: "Internet Brands",
	website: "https://www.internetbrands.com",
	description: "Internet Brands is a technology company that operates a variety of web portals and online communities, providing information and services to consumers and businesses across a range of industries.",
	icon: "Internet Brands.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "internet-brands:dom:0",
			kind: "dom",
			selector: "footer > div > form",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "internet-brands:text:1",
			kind: "text",
			pattern: new RegExp("Internet Brands"),
			description: "Page text contains a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
