import type { TechnologyDefinition } from '../../types';

export const bunnyTechnologyDefinition = {
	id: "bunny",
	name: "Bunny",
	website: "https://bunny.net",
	description: "Bunny is a content delivery and edge cloud platform with CDN, storage, streaming, and security services.",
	icon: "Bunny.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "bunny:dom:0",
			kind: "dom",
			selector: "[src*='.b-cdn.net'],[data-src*='.b-cdn.net']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "bunny:header:1",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^BunnyCDN", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "bunny:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^bunnycdn", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
