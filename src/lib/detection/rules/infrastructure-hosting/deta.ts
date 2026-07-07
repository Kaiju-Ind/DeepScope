import type { TechnologyDefinition } from '../../types';

export const detaTechnologyDefinition = {
	id: "deta",
	name: "Deta",
	website: "https://deta.sh",
	description: "Deta is a cloud platform for building and deploying apps.",
	icon: "deta.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "deta:url:0",
			kind: "url",
			pattern: new RegExp("^https?:\\/\\/[^/]+\\.deta\\.(?:app|dev)"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "deta:header:1",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^Deta$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "deta:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^deta$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
