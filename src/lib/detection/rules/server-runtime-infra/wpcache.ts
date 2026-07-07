import type { TechnologyDefinition } from '../../types';

export const wpcacheTechnologyDefinition = {
	id: "wpcache",
	name: "wpCache",
	website: "https://wpcache.co",
	description: "WPCache is a static caching plugin for WordPress.",
	icon: "wpCache.png",
	categories: [
		"server-runtime-infra",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "wpcache:html:0",
			kind: "html",
			pattern: new RegExp("<!--[^>]+wpCache"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "wpcache:url:1",
			kind: "url",
			pattern: new RegExp("^https?:\\/\\/[^/]+\\.wpcache\\.co"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "wpcache:header:2",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("wpCache(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "wpcache:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("wpCache", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "wpcache:meta:4",
			kind: "meta",
			key: "keywords",
			valuePattern: new RegExp("wpCache", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "wpcache:html:5",
			kind: "html",
			pattern: new RegExp("<!--[^>]+wpcache"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "wpcache:header:6",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("wpcache(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "wpcache:meta:7",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("wpcache", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "wpcache:meta:8",
			kind: "meta",
			key: "keywords",
			valuePattern: new RegExp("wpcache", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"php",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
