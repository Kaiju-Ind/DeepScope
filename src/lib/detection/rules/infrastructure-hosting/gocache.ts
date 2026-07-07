import type { TechnologyDefinition } from '../../types';

export const gocacheTechnologyDefinition = {
	id: "gocache",
	name: "GoCache",
	website: "https://www.gocache.com.br/",
	description: "GoCache is an in-memory key:value store/cache similar to memcached that is suitable for applications running on a single machine.",
	icon: "GoCache.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "gocache:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^gocache$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "gocache:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^gocache$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
