import type { TechnologyDefinition } from '../../types';

export const phpsqlitecmsTechnologyDefinition = {
	id: "phpsqlitecms",
	name: "phpSQLiteCMS",
	website: "https://phpsqlitecms.net",
	icon: "phpSQLiteCMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "phpsqlitecms:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^phpSQLiteCMS(?: (.+))?$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "phpsqlitecms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^phpsqlitecms(?: (.+))?$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:phpsqlitecms:phpsqlitecms:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
		"sqlite",
	],
} as const satisfies TechnologyDefinition;
