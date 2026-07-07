import type { TechnologyDefinition } from '../../types';

export const mediawikiTechnologyDefinition = {
	id: "mediawiki",
	name: "MediaWiki",
	website: "https://www.mediawiki.org",
	description: "MediaWiki is a free and open-source wiki engine.",
	icon: "MediaWiki.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "mediawiki:html:0",
			kind: "html",
			pattern: new RegExp("<body[^>]+class=\"mediawiki\""),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "mediawiki:html:1",
			kind: "html",
			pattern: new RegExp("<(?:a|img)[^>]+>Powered by MediaWiki<\\/a>"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "mediawiki:html:2",
			kind: "html",
			pattern: new RegExp("<a[^>]+\\/Special:WhatLinksHere\\/"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "mediawiki:jsGlobal:3",
			kind: "jsGlobal",
			property: "mw.util.toggleToc",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mediawiki:jsGlobal:4",
			kind: "jsGlobal",
			property: "wgTitle",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mediawiki:jsGlobal:5",
			kind: "jsGlobal",
			property: "wgVersion",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mediawiki:meta:6",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^MediaWiki ?(.+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "mediawiki:dom:7",
			kind: "dom",
			selector: "body[class*='mediawiki']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "mediawiki:cookie:8",
			kind: "cookie",
			keyPattern: new RegExp("^wiki\\\\d\\+_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "mediawiki:html:9",
			kind: "html",
			pattern: new RegExp("<(?:a|img)[^>]+>powered by mediawiki<\\/a>"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "mediawiki:html:10",
			kind: "html",
			pattern: new RegExp("<a[^>]+\\/special:whatlinkshere\\/"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "mediawiki:meta:11",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^mediawiki ?(.+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:mediawiki:mediawiki:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
