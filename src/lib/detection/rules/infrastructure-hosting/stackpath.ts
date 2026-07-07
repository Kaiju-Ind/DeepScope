import type { TechnologyDefinition } from '../../types';

export const stackpathTechnologyDefinition = {
	id: "stackpath",
	name: "StackPath",
	website: "https://www.stackpath.com",
	description: "StackPath is a cloud computing and services provider.",
	icon: "StackPath.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "stackpath:header:0",
			kind: "header",
			key: "x-backend-server",
			valuePattern: new RegExp("hosting\\.stackcp\\.net$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "stackpath:header:1",
			kind: "header",
			key: "x-provided-by",
			valuePattern: new RegExp("^StackCDN(?: ([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "stackpath:header:2",
			kind: "header",
			key: "x-provided-by",
			valuePattern: new RegExp("^stackcdn(?: ([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
