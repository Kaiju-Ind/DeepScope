import type { TechnologyDefinition } from '../../types';

export const tiddlywikiTechnologyDefinition = {
	id: "tiddlywiki",
	name: "TiddlyWiki",
	website: "https://tiddlywiki.com",
	description: "TiddlyWiki is an open-source notebook for capturing, organising and sharing complex information.",
	icon: "TiddlyWiki.png",
	categories: [
		"platform-cms-builder",
		"community-ugc",
		"content-publishing",
	],
	rules: [
		{
			id: "tiddlywiki:html:0",
			kind: "html",
			pattern: new RegExp("<[^>]*type=[^>]text\\/vnd\\.tiddlywiki"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "tiddlywiki:jsGlobal:1",
			kind: "jsGlobal",
			property: "tiddler",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "tiddlywiki:meta:2",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^TiddlyWiki$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "tiddlywiki:meta:3",
			kind: "meta",
			key: "copyright",
			valuePattern: new RegExp("^TiddlyWiki created by Jeremy Ruston", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "tiddlywiki:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^TiddlyWiki$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "tiddlywiki:meta:5",
			kind: "meta",
			key: "tiddlywiki-version",
			valuePattern: new RegExp("^(.+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "tiddlywiki:jsGlobal:6",
			kind: "jsGlobal",
			property: "__tiddlywiki_cpl__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "tiddlywiki:meta:7",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^tiddlywiki$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "tiddlywiki:meta:8",
			kind: "meta",
			key: "copyright",
			valuePattern: new RegExp("^tiddlywiki created by jeremy ruston", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "tiddlywiki:meta:9",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^tiddlywiki$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
