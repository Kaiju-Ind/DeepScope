import type { TechnologyDefinition } from '../../types';

export const suluTechnologyDefinition = {
	id: "sulu",
	name: "Sulu",
	website: "https://sulu.io",
	description: "Sulu is the go-to CMS for back-end projects written within the PHP Symfony framework.",
	icon: "Sulu.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sulu:jsGlobal:0",
			kind: "jsGlobal",
			property: "SULU_CONFIG.suluVersion",
			valuePattern: new RegExp("^([\\d\\.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sulu:header:1",
			kind: "header",
			key: "X-Generator",
			valuePattern: new RegExp("Sulu\\/?(.+)?$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "sulu:header:2",
			kind: "header",
			key: "x-generator",
			valuePattern: new RegExp("sulu\\/?(.+)?$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:sulu:sulu:*:*:*:*:*:*:*:*",
	},
	implies: [
		"symfony",
	],
} as const satisfies TechnologyDefinition;
