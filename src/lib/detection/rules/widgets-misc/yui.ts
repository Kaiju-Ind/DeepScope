import type { TechnologyDefinition } from '../../types';

export const yuiTechnologyDefinition = {
	id: "yui",
	name: "YUI",
	website: "https://clarle.github.io/yui3",
	description: "YUI is a JavaScript and CSS library with more than 30 unique components including low-level DOM utilities and high-level user-interface widgets.",
	icon: "YUI.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "yui:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:\\/yui\\/|yui\\.yahooapis\\.com)"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "yui:jsGlobal:1",
			kind: "jsGlobal",
			property: "YAHOO.VERSION",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "yui:jsGlobal:2",
			kind: "jsGlobal",
			property: "YUI.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:yahoo:yui:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
