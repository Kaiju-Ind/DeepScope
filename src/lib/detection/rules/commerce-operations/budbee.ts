import type { TechnologyDefinition } from '../../types';

export const budbeeTechnologyDefinition = {
	id: "budbee",
	name: "Budbee",
	website: "https://app.budbee.com/",
	description: "Budbee is a tech company that operates a logistics service for ecommerce.",
	icon: "Budbee.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "budbee:text:0",
			kind: "text",
			pattern: new RegExp("\\bBudbee\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
