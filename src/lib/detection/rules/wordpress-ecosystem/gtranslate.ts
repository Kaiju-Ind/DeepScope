import type { TechnologyDefinition } from '../../types';

export const gtranslateTechnologyDefinition = {
	id: "gtranslate",
	name: "GTranslate",
	website: "https://gtranslate.io",
	description: "GTranslate is a website translator which can translate any website to any language automatically.",
	icon: "GTranslate.svg",
	categories: [
		"wordpress-ecosystem",
		"translations",
	],
	rules: [
		{
			id: "gtranslate:resourceUrl:0",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/plugins/gtranslate/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/gtranslate/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/plugins/gtranslate/.",
		},
		{
			id: "gtranslate:stylesheetHref:1",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/plugins/gtranslate/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/gtranslate/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/plugins/gtranslate/.",
		},
		{
			id: "gtranslate:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/plugins/gtranslate/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/gtranslate/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/plugins/gtranslate/.",
		},
		{
			id: "gtranslate:html:3",
			kind: "html",
			pattern: new RegExp("/wp\\-content/plugins/gtranslate/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/gtranslate/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references /wp-content/plugins/gtranslate/.",
		},
		{
			id: "gtranslate:dom:4",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/gtranslate/'], img[src*='/wp-content/plugins/gtranslate/'], .gtranslate_wrapper, select.gt_selector, a.glink, [class*='gt_switcher']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:gtranslate:gtranslate:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
