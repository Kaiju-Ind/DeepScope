import type { TechnologyDefinition } from '../../types';

export const flyingpressTechnologyDefinition = {
	id: "flyingpress",
	name: "FlyingPress",
	website: "https://flying-press.com",
	description: "FlyingPress is a WordPress plugin that helps to improve website performance by optimising various aspects of a WordPress site. The plugin offers a range of features, including caching, image optimisation, lazy loading, database optimisation, and more.",
	icon: "FlyingPress.svg",
	categories: [
		"wordpress-ecosystem",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "flyingpress:resourceUrl:0",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/plugins/flying\\-press/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/flying\\-press/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/plugins/flying-press/.",
		},
		{
			id: "flyingpress:stylesheetHref:1",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/plugins/flying\\-press/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/flying\\-press/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/plugins/flying-press/.",
		},
		{
			id: "flyingpress:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/plugins/flying\\-press/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/flying\\-press/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/plugins/flying-press/.",
		},
		{
			id: "flyingpress:html:3",
			kind: "html",
			pattern: new RegExp("(?:/wp\\-content/plugins/flying\\-press/|Powered by FlyingPress|flying\\-press\\-lazy\\-bg)", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/flying\\-press/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references FlyingPress plugin assets, lazy-load classes, or cache footer marker.",
		},
		{
			id: "flyingpress:dom:4",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/flying-press/'], script[src*='/wp-content/plugins/flying-press/'], .flying-press-lazy-bg, [data-loading-method][data-src]",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
