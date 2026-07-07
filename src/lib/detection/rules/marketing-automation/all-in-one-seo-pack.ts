import type { TechnologyDefinition } from '../../types';

export const allInOneSeoPackTechnologyDefinition = {
	id: "all-in-one-seo-pack",
	name: "All in One SEO Pack",
	website: "https://aioseo.com",
	description: "All in One SEO plugin optimizes WordPress website and its content for search engines.",
	icon: "AIOSEO.svg",
	categories: [
		"marketing-automation",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "all-in-one-seo-pack:html:0",
			kind: "html",
			pattern: new RegExp("<!-- All in One SEO Pack ([\\d.]+) "),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "all-in-one-seo-pack:dom:1",
			kind: "dom",
			selector: "script.aioseo-schema",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "all-in-one-seo-pack:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^All in One SEO \\(AIOSEO\\)\\s([\\d.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "all-in-one-seo-pack:html:3",
			kind: "html",
			pattern: new RegExp("<!-- all in one seo pack ([\\d.]+) "),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "all-in-one-seo-pack:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^all in one seo \\(aioseo\\)\\s([\\d.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:aioseo:all_in_one_seo:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
