import type { TechnologyDefinition } from '../../types';

export const autoptimizeTechnologyDefinition = {
	id: "autoptimize",
	name: "Autoptimize",
	website: "https://autoptimize.com",
	description: "Autoptimize is a WordPress plugin that optimises website performance by aggregating, minifying, and compressing HTML, CSS, and JavaScript files.",
	icon: "Autoptimize.png",
	categories: [
		"wordpress-ecosystem",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "autoptimize:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/(?:plugins|cache)/autoptimize/", "i"),
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/(?:plugins|cache)/autoptimize/[^?#\\s\"\\']+[?&](?:ver|ao_version)=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from an Autoptimize plugin or cache path.",
		},
		{
			id: "autoptimize:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/autoptimize/'], link[href*='/wp-content/cache/autoptimize/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "autoptimize:resourceUrl:2",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/(?:plugins|cache)/autoptimize/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/(?:plugins|cache)/autoptimize/[^?#\\s\"\\']+[?&](?:ver|ao_version)=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from an Autoptimize plugin or cache path.",
		},
		{
			id: "autoptimize:stylesheetHref:3",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/(?:plugins|cache)/autoptimize/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/(?:plugins|cache)/autoptimize/[^?#\\s\"\\']+[?&](?:ver|ao_version)=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from an Autoptimize plugin or cache path.",
		},
		{
			id: "autoptimize:html:4",
			kind: "html",
			pattern: new RegExp("/wp\\-content/(?:plugins|cache)/autoptimize/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/(?:plugins|cache)/autoptimize/[^?#\\s\"\\']+[?&](?:ver|ao_version)=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references an Autoptimize plugin or cache path.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"onetime",
		],
		cpe: "cpe:2.3:a:autoptimize:autoptimize:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
