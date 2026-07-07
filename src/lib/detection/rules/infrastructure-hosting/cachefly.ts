import type { TechnologyDefinition } from '../../types';

export const cacheflyTechnologyDefinition = {
	id: "cachefly",
	name: "CacheFly",
	website: "https://www.cachefly.com",
	description: "CacheFly is a content delivery network (CDN) which offers CDN service that relies solely on IP anycast for routing, rather than DNS based global load balancing.",
	icon: "CacheFly.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "cachefly:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^CFS ", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "cachefly:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^cfs ", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
