import type { TechnologyDefinition } from '../../types';

export const foswikiTechnologyDefinition = {
	id: "foswiki",
	name: "Foswiki",
	website: "https://foswiki.org",
	description: "Foswiki is a free open-source collaboration platform.",
	icon: "foswiki.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "foswiki:html:0",
			kind: "html",
			pattern: new RegExp("<div class=\"foswiki(?:Copyright|Page|Main)\">"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "foswiki:jsGlobal:1",
			kind: "jsGlobal",
			property: "foswiki",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "foswiki:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^FOSWIKISTRIKEONE$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "foswiki:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^SFOSWIKISID$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "foswiki:dom:4",
			kind: "dom",
			selector: "div.foswikiCopyright, div.foswikiPage, div.foswikiMain",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "foswiki:html:5",
			kind: "html",
			pattern: new RegExp("<div class=\"foswiki(?:copyright|page|main)\">"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "foswiki:cookie:6",
			kind: "cookie",
			keyPattern: new RegExp("^foswikistrikeone$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "foswiki:cookie:7",
			kind: "cookie",
			keyPattern: new RegExp("^sfoswikisid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:foswiki:foswiki:*:*:*:*:*:*:*:*",
	},
	implies: [
		"perl",
	],
} as const satisfies TechnologyDefinition;
