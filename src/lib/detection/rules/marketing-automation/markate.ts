import type { TechnologyDefinition } from '../../types';

export const markateTechnologyDefinition = {
	id: "markate",
	name: "Markate",
	website: "https://www.markate.com",
	description: "Markate is an all-in-one CRM and sales and marketing automation platform.",
	icon: "Markate.svg",
	categories: [
		"marketing-automation",
		"business-tools",
	],
	rules: [
		{
			id: "markate:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.markate\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "markate:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Markate$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "markate:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^markate$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
