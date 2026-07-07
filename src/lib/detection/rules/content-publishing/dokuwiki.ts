import type { TechnologyDefinition } from '../../types';

export const dokuwikiTechnologyDefinition = {
	id: "dokuwiki",
	name: "DokuWiki",
	website: "https://www.dokuwiki.org",
	description: "DokuWiki is an open-source wiki application that stores content in plain text files.",
	icon: "DokuWiki.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "dokuwiki:jsGlobal:0",
			kind: "jsGlobal",
			property: "DOKU_TPL",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "dokuwiki:jsGlobal:1",
			kind: "jsGlobal",
			property: "doku_edit_text_content",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "dokuwiki:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^DokuWiki$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "dokuwiki:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^DokuWiki( Release [\\d-]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "dokuwiki:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^dokuwiki$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "dokuwiki:meta:5",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^dokuwiki( release [\\d-]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:dokuwiki:dokuwiki:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
