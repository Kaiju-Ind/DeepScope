import type { TechnologyDefinition } from '../../types';

export const bansheeTechnologyDefinition = {
	id: "banshee",
	name: "Banshee",
	website: "https://www.banshee-php.org",
	description: "Banshee is a PHP website framework with a main focus on security. Banshee is protected against common attacks like SQL injection, cross-site scripting, cross-site request forgery and session hijacking.",
	icon: "Banshee.png",
	categories: [
		"platform-cms-builder",
		"framework",
	],
	rules: [
		{
			id: "banshee:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Banshee PHP framework v([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "banshee:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Banshee PHP", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "banshee:header:2",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("banshee php framework v([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "banshee:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("banshee php", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
