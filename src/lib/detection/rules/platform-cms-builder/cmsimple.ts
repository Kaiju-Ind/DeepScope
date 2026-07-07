import type { TechnologyDefinition } from '../../types';

export const cmsimpleTechnologyDefinition = {
	id: "cmsimple",
	name: "CMSimple",
	website: "https://www.cmsimple.org/en",
	description: "CMSimple is a flat-file content management system for small websites.",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "cmsimple:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("CMSimple( [\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "cmsimple:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("cmsimple( [\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:cmsimple:cmsimple:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
