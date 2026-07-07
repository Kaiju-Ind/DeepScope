import type { TechnologyDefinition } from '../../types';

export const bigaceTechnologyDefinition = {
	id: "bigace",
	name: "BIGACE",
	website: "https://github.com/bigace",
	description: "Bigace is a free open-source content management developed in PHP and JavaScript that uses a MySQL or ADOdb environment.",
	icon: "BIGACE.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "bigace:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("BIGACE ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "bigace:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("bigace ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:bigace:bigace:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
