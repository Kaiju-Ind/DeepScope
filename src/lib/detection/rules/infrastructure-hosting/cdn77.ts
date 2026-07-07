import type { TechnologyDefinition } from '../../types';

export const cdn77TechnologyDefinition = {
	id: "cdn77",
	name: "CDN77",
	website: "https://www.cdn77.com",
	description: "CDN77 is a content delivery network (CDN).",
	icon: "CDN77.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "cdn77:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^CDN77-Turbo$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "cdn77:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^cdn77-turbo$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
