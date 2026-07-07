import type { TechnologyDefinition } from '../../types';

export const editInPlaceTechnologyDefinition = {
	id: "edit-in-place",
	name: "Edit-in-Place",
	website: "https://24ways.org/2005/edit-in-place-with-ajax",
	description: "Edit-in-Place is a tool that enables text editing directly on the page using AJAX-style updates without requiring a full page reload.",
	categories: [
		"rich-text-editors",
	],
	rules: [
		{
			id: "edit-in-place:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/jquery\\.editinplace\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
	requires: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
