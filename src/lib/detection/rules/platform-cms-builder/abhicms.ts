import type { TechnologyDefinition } from '../../types';

export const abhicmsTechnologyDefinition = {
	id: "abhicms",
	name: "AbhiCMS",
	website: "https://website999.org",
	description: "AbhiCMS is a lesser-known content management system that may not have a significant user base or active development community.",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "abhicms:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("AbhiCMS\\s([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "abhicms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("abhicms\\s([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
	implies: [
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;
