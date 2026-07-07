import type { TechnologyDefinition } from '../../types';

export const keycdnTechnologyDefinition = {
	id: "keycdn",
	name: "KeyCDN",
	website: "https://www.keycdn.com",
	description: "KeyCDN is a content delivery network (CDN).",
	icon: "KeyCDN.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "keycdn:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^keycdn-engine$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "keycdn:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^keycdn-engine$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
