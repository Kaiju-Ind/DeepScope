import type { TechnologyDefinition } from '../../types';

export const xwikiTechnologyDefinition = {
	id: "xwiki",
	name: "XWiki",
	website: "https://www.xwiki.org",
	description: "XWiki is a free wiki software platform written in Java.",
	icon: "xwiki.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "xwiki:html:0",
			kind: "html",
			pattern: new RegExp("<html[^>]data-xwiki-[^>]>"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "xwiki:meta:1",
			kind: "meta",
			key: "wiki",
			valuePattern: new RegExp("xwiki", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "xwiki:dom:2",
			kind: "dom",
			selector: "html[data-xwiki-]",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "xwiki:jsGlobal:3",
			kind: "jsGlobal",
			property: "XWiki.mainWiki",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:xwiki:xwiki:*:*:*:*:*:*:*:*",
	},
	implies: [
		"java-confidence-99",
	],
	excludes: [
		"mediawiki",
	],
} as const satisfies TechnologyDefinition;
