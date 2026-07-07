import type { TechnologyDefinition } from '../../types';

export const drupalTechnologyDefinition = {
	id: "drupal",
	name: "Drupal",
	website: "https://www.drupal.org/",
	description: "Drupal is an open-source CMS and web application framework written in PHP.",
	icon: "Drupal.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "drupal:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("drupal\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "drupal:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("drupal_internal__nid"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "drupal:html:2",
			kind: "html",
			pattern: new RegExp("<(?:link|style)[^>]+\"\\/sites\\/(?:default|all)\\/(?:themes|modules)\\/"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "drupal:jsGlobal:3",
			kind: "jsGlobal",
			property: "Drupal",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "drupal:header:4",
			kind: "header",
			key: "Expires",
			valuePattern: new RegExp("19 Nov 1978", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "drupal:header:5",
			kind: "header",
			key: "X-Generator",
			valuePattern: new RegExp("^Drupal(?:\\s([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "drupal:meta:6",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Drupal(?:\\s([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "drupal:dom:7",
			kind: "dom",
			selector: "link[href*='/sites/default/themes/'], link[href*='/sites/all/themes/'], link[href*='/sites/default/modules/'], link[href*='/sites/all/modules/'], style[href*='/sites/default/themes/'], style[href*='/sites/all/themes/'], style[href*='/sites/default/modules/'], style[href*='/sites/all/modules/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "drupal:cookie:8",
			kind: "cookie",
			keyPattern: new RegExp("^SESS\\[a\\-f0\\-9\\]\\{32\\}$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "drupal:header:9",
			kind: "header",
			key: "expires",
			valuePattern: new RegExp("19 nov 1978", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "drupal:header:10",
			kind: "header",
			key: "x-generator",
			valuePattern: new RegExp("^drupal(?:\\s([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "drupal:meta:11",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^drupal(?:\\s([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:drupal:drupal:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
