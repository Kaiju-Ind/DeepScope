import type { TechnologyDefinition } from '../../types';

export const osterreichischePostTechnologyDefinition = {
	id: "osterreichische-post",
	name: "Osterreichische Post",
	website: "https://www.post.at",
	description: "Österreichische Post is an Austrian logistics and postal services provider.",
	icon: "Post AG.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "osterreichische-post:text:0",
			kind: "text",
			pattern: new RegExp("\\bpost\\.at\\b"),
			description: "Page text contains a known technology marker.",
		},
		{
			id: "osterreichische-post:text:1",
			kind: "text",
			pattern: new RegExp("\\bPost AG\\b"),
			description: "Page text contains a known technology marker.",
		},
		{
			id: "osterreichische-post:text:2",
			kind: "text",
			pattern: new RegExp("\\b[ÖO]sterreichische Post\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
