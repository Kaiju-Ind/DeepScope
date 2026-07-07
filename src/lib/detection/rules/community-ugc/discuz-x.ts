import type { TechnologyDefinition } from '../../types';

export const discuzXTechnologyDefinition = {
	id: "discuz-x",
	name: "Discuz! X",
	website: "https://www.discuz.net",
	description: "Discuz! X is an internet forum software written in PHP and supports MySQL and PostgreSQL databases.",
	icon: "Discuz X.png",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "discuz-x:jsGlobal:0",
			kind: "jsGlobal",
			property: "DISCUZCODE",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "discuz-x:jsGlobal:1",
			kind: "jsGlobal",
			property: "discuzVersion",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "discuz-x:jsGlobal:2",
			kind: "jsGlobal",
			property: "discuz_uid",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "discuz-x:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Discuz! X([\\d\\.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "discuz-x:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("discuz! x([\\d\\.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
