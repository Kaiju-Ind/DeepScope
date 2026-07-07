import type { TechnologyDefinition } from '../../types';

export const mediumTechnologyDefinition = {
	id: "medium",
	name: "Medium",
	website: "https://medium.com",
	description: "Medium is an online publishing platform.",
	icon: "Medium.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "medium:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("medium\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "medium:url:1",
			kind: "url",
			pattern: new RegExp("^https?:\\/\\/(?:www\\.)?medium\\.com"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "medium:header:2",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^Medium$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "medium:header:3",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^medium$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"node-js",
	],
} as const satisfies TechnologyDefinition;
