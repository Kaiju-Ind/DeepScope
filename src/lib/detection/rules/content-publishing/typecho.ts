import type { TechnologyDefinition } from '../../types';

export const typechoTechnologyDefinition = {
	id: "typecho",
	name: "Typecho",
	website: "https://typecho.org/",
	description: "Typecho is a PHP Blogging Platform.",
	icon: "typecho.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "typecho:url:0",
			kind: "url",
			pattern: new RegExp("\\/admin\\/login\\.php?referer=http%3A%2F%2F"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "typecho:jsGlobal:1",
			kind: "jsGlobal",
			property: "TypechoComment",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "typecho:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Typecho( [\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "typecho:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("typecho( [\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:typecho:typecho:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
