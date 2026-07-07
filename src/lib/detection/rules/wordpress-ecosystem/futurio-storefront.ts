import type { TechnologyDefinition } from '../../types';

export const futurioStorefrontTechnologyDefinition = {
	id: "futurio-storefront",
	name: "Futurio Storefront",
	website: "https://wordpress.org/themes/futurio-storefront/",
	description: "Futurio Storefront is a popular WordPress theme. Detection is based on plugin/theme asset paths, not loose text mentions.",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "futurio-storefront:resourceUrl:0",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/themes/futurio\\-storefront/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/themes/futurio\\-storefront/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/themes/futurio-storefront/.",
		},
		{
			id: "futurio-storefront:stylesheetHref:1",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/themes/futurio\\-storefront/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/themes/futurio\\-storefront/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/themes/futurio-storefront/.",
		},
		{
			id: "futurio-storefront:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/themes/futurio\\-storefront/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/themes/futurio\\-storefront/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/themes/futurio-storefront/.",
		},
		{
			id: "futurio-storefront:html:3",
			kind: "html",
			pattern: new RegExp("/wp\\-content/themes/futurio\\-storefront/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/themes/futurio\\-storefront/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references /wp-content/themes/futurio-storefront/.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
