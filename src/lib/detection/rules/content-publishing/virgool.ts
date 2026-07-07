import type { TechnologyDefinition } from '../../types';

export const virgoolTechnologyDefinition = {
	id: "virgool",
	name: "Virgool",
	website: "https://virgool.io",
	icon: "Virgool.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "virgool:url:0",
			kind: "url",
			pattern: new RegExp("^https?:\\/\\/(?:www\\.)?virgool\\.io"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "virgool:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^Virgool$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "virgool:header:2",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^virgool$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
