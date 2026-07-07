import type { TechnologyDefinition } from '../../types';

export const allInOneSeoTechnologyDefinition = {
	id: "all-in-one-seo",
	name: "All in One SEO",
	website: "https://aioseo.com",
	description: "All in One SEO optimizes a WordPress website and its content for search engines.",
	icon: "AIOSEO.svg",
	categories: [
		"marketing-automation",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "all-in-one-seo:html:0",
			kind: "html",
			pattern: new RegExp("<!-- all in one seo ([\\d.]+) "),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "all-in-one-seo:html:1",
			kind: "html",
			pattern: new RegExp("<!-- all in one seo pack ([\\d.]+) "),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "all-in-one-seo:html:2",
			kind: "html",
			pattern: new RegExp("<!-- all in one seo pro ([\\d.]+) "),
			version: {
				source: "match",
				template: "pro $1",
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "all-in-one-seo:dom:3",
			kind: "dom",
			selector: "script.aioseo-schema",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "all-in-one-seo:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^all in one seo \\(aioseo\\) ([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "all-in-one-seo:html:5",
			kind: "html",
			pattern: new RegExp("<!-- All in One SEO Pack ([\\d.]+) "),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "all-in-one-seo:html:6",
			kind: "html",
			pattern: new RegExp("<!-- All in One SEO ([\\d.]+) "),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "all-in-one-seo:html:7",
			kind: "html",
			pattern: new RegExp("<!-- All in One SEO Pro ([\\d.]+) "),
			version: {
				source: "match",
				template: "Pro $1",
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "all-in-one-seo:meta:8",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^All in One SEO \\(AIOSEO\\) ([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "all-in-one-seo:meta:9",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^All in One SEO Pro \\(AIOSEO\\) ([\\d\\.]+)", "i"),
			version: {
				source: "match",
				template: "Pro $1",
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "all-in-one-seo:meta:10",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^all in one seo pro \\(aioseo\\) ([\\d\\.]+)", "i"),
			version: {
				source: "match",
				template: "pro $1",
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:aioseo:all_in_one_seo:*:*:*:*:*:wordpress:*:*",
	},
	implies: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
