import type { TechnologyDefinition } from '../../types';

export const ampForWordpressTechnologyDefinition = {
	id: "amp-for-wordpress",
	name: "AMP for WordPress",
	website: "https://amp-wp.org",
	description: "AMP for WordPress automatically adds Accelerated Mobile Pages (Google AMP Project) functionality to your WordPress site.",
	icon: "Accelerated-Mobile-Pages.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "amp-for-wordpress:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/amp/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "amp-for-wordpress:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^AMP Plugin v(\\d+\\.\\d+.*)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "amp-for-wordpress:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^amp plugin v(\\d+\\.\\d+.*)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "amp-for-wordpress:resourceUrl:3",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/plugins/amp/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/amp/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/plugins/amp/.",
		},
		{
			id: "amp-for-wordpress:scriptSrc:4",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/plugins/amp/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/amp/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/plugins/amp/.",
		},
		{
			id: "amp-for-wordpress:html:5",
			kind: "html",
			pattern: new RegExp("/wp\\-content/plugins/amp/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/amp/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references /wp-content/plugins/amp/.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:ampforwp:accelerated_mobile_pages:*:*:*:*:*:wordpress:*:*",
	},
	implies: [
		"amp",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
