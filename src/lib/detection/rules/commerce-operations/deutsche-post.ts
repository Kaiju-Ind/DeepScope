import type { TechnologyDefinition } from '../../types';

export const deutschePostTechnologyDefinition = {
	id: "deutsche-post",
	name: "Deutsche Post",
	website: "https://www.deutschepost.de",
	description: "Deutsche Post is a German multinational package delivery and supply chain management company in Germany.",
	icon: "Deutsche Post.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "deutsche-post:text:0",
			kind: "text",
			pattern: new RegExp("\\bDeutsche Post\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
