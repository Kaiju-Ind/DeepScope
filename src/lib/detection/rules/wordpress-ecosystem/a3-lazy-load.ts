import type { TechnologyDefinition } from '../../types';

export const a3LazyLoadTechnologyDefinition = {
	id: "a3-lazy-load",
	name: "a3 Lazy Load",
	website: "https://a3rev.com/shop/a3-lazy-load/",
	description: "a3 Lazy Load is a mobile oriented, very simple to use plugin that will speed up sites page load speed.",
	icon: "a3.png",
	categories: [
		"wordpress-ecosystem",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "a3-lazy-load:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/plugins/a3\\-lazy\\-load/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/a3\\-lazy\\-load/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/plugins/a3-lazy-load/.",
		},
		{
			id: "a3-lazy-load:jsGlobal:1",
			kind: "jsGlobal",
			property: "a3_lazyload_extend_params",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "a3-lazy-load:jsGlobal:2",
			kind: "jsGlobal",
			property: "a3_lazyload_params",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "a3-lazy-load:resourceUrl:3",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/plugins/a3\\-lazy\\-load/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/a3\\-lazy\\-load/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/plugins/a3-lazy-load/.",
		},
		{
			id: "a3-lazy-load:stylesheetHref:4",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/plugins/a3\\-lazy\\-load/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/a3\\-lazy\\-load/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/plugins/a3-lazy-load/.",
		},
		{
			id: "a3-lazy-load:html:5",
			kind: "html",
			pattern: new RegExp("/wp\\-content/plugins/a3\\-lazy\\-load/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/a3\\-lazy\\-load/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references /wp-content/plugins/a3-lazy-load/.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
