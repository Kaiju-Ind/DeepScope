import type { TechnologyDefinition } from '../../types';

export const australiaPostTechnologyDefinition = {
	id: "australia-post",
	name: "Australia Post",
	website: "https://auspost.com.au",
	description: "Australia Post is the government business enterprise that provides postal services in Australia.",
	icon: "AusPost.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "australia-post:text:0",
			kind: "text",
			pattern: new RegExp("\\bAusPost\\b"),
			description: "Page text contains a known technology marker.",
		},
		{
			id: "australia-post:text:1",
			kind: "text",
			pattern: new RegExp("\\bAustralia Post\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
