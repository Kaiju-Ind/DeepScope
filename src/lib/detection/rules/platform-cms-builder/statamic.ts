import type { TechnologyDefinition } from '../../types';

export const statamicTechnologyDefinition = {
	id: "statamic",
	name: "Statamic",
	website: "https://statamic.com",
	description: "Statamic is an open-source and self-hosted content management system based on the PHP programming language.",
	icon: "Statamic.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "statamic:jsGlobal:0",
			kind: "jsGlobal",
			property: "Statamic",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "statamic:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^Statamic$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "statamic:scriptContent:2",
			kind: "scriptContent",
			pattern: new RegExp("statamic\\.cp"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "statamic:header:3",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^statamic$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: false,
		oss: true,
		pricing: [
			"freemium",
			"mid",
			"payg",
		],
		cpe: "cpe:2.3:a:statamic:statamic:*:*:*:*:*:laravel:*:*",
	},
	implies: [
		"laravel",
		"php",
	],
} as const satisfies TechnologyDefinition;
