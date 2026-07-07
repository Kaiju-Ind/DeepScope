import type { TechnologyDefinition } from '../../types';

export const bigwareTechnologyDefinition = {
	id: "bigware",
	name: "Bigware",
	website: "https://bigware.de",
	icon: "Bigware.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "bigware:html:0",
			kind: "html",
			pattern: new RegExp("(?:Diese <a href=[^>]+bigware\\.de|<a href=[^>]+\\/main_bigware_\\d+\\.php)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "bigware:url:1",
			kind: "url",
			pattern: new RegExp("(?:\\?|&)bigWAdminID="),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "bigware:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^bigWAdminID$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "bigware:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^bigwareCsid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "bigware:html:4",
			kind: "html",
			pattern: new RegExp("(?:diese <a href=[^>]+bigware\\.de|<a href=[^>]+\\/main_bigware_\\d+\\.php)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "bigware:cookie:5",
			kind: "cookie",
			keyPattern: new RegExp("^bigwadminid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "bigware:cookie:6",
			kind: "cookie",
			keyPattern: new RegExp("^bigwarecsid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:bigware:bigware_shop:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
