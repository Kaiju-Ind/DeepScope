import type { TechnologyDefinition } from '../../types';

export const joomlaTechnologyDefinition = {
	id: "joomla",
	name: "Joomla",
	website: "https://www.joomla.org/",
	description: "Joomla is an open-source CMS written in PHP for publishing websites and web applications.",
	icon: "Joomla.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "joomla:html:0",
			kind: "html",
			pattern: new RegExp("(?:<div[^>]+id=\"wrapper_r\"|<(?:link|script)[^>]+(?:feed|components)\\/com_|<table[^>]+class=\"pill)"),
			confidence: 50,
			description: "HTML contains a known technology signature.",
		},
		{
			id: "joomla:url:1",
			kind: "url",
			pattern: new RegExp("option=com_"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "joomla:jsGlobal:2",
			kind: "jsGlobal",
			property: "Joomla",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "joomla:jsGlobal:3",
			kind: "jsGlobal",
			property: "jcomments",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "joomla:header:4",
			kind: "header",
			key: "X-Content-Encoded-By",
			valuePattern: new RegExp("Joomla! ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "joomla:meta:5",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Joomla!(?: ([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "joomla:scriptSrc:6",
			kind: "scriptSrc",
			pattern: new RegExp("(?:^|\\/)(feed\\/com_|components\\/com_)"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "joomla:dom:7",
			kind: "dom",
			selector: "div[id*='wrapper_r'], link[href*='feed/com_'], link[href*='components/com_'], table[class*='pill']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "joomla:cookie:8",
			kind: "cookie",
			keyPattern: new RegExp("^joomla_\\[a\\-z0\\-9\\]\\+$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "joomla:header:9",
			kind: "header",
			key: "x-content-encoded-by",
			valuePattern: new RegExp("joomla! ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "joomla:meta:10",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("joomla!(?: ([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:joomla:joomla\\!:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
