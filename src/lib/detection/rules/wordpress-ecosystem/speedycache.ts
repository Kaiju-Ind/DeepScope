import type { TechnologyDefinition } from '../../types';

export const speedycacheTechnologyDefinition = {
	id: "speedycache",
	name: "SpeedyCache",
	website: "https://speedycache.com",
	description: "SpeedyCache is a WordPress plugin for optimizing page load times and caching efficiency.",
	icon: "SpeedyCache.svg",
	categories: [
		"wordpress-ecosystem",
		"server-runtime-infra",
	],
	rules: [
		{
			id: "speedycache:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/cache/speedycache/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "speedycache:jsGlobal:1",
			kind: "jsGlobal",
			property: "speedycachell",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: false,
		pricing: [
			"freemium",
			"low",
		],
		cpe: "cpe:2.3:a:softaculous:speedycache:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
