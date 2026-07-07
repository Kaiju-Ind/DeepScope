import type { TechnologyDefinition } from '../../types';

export const googleAnalyticsTechnologyDefinition = {
	id: "google-analytics",
	name: "Google Analytics",
	website: "https://google.com/analytics",
	description: "Google Analytics is a web analytics service for measuring traffic, events, and user behavior.",
	icon: "Google Analytics.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "google-analytics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("google-analytics\\.com\\/(?:ga|urchin|analytics)\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "google-analytics:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("googletagmanager\\.com\\/gtag\\/js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "google-analytics:scriptContent:2",
			kind: "scriptContent",
			pattern: new RegExp("gtag\\([^)]+'(UA-)"),
			version: {
				source: "match",
				template: "$1?UA:",
			},
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "google-analytics:scriptContent:3",
			kind: "scriptContent",
			pattern: new RegExp("gtag\\([^)]+'(G-)"),
			version: {
				source: "match",
				template: "$1?GA4:",
			},
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "google-analytics:dom:4",
			kind: "dom",
			selector: "amp-analytics[type*=googleanalytics]",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "google-analytics:jsGlobal:5",
			kind: "jsGlobal",
			property: "GoogleAnalyticsObject",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "google-analytics:jsGlobal:6",
			kind: "jsGlobal",
			property: "gaGlobal",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "google-analytics:cookie:7",
			kind: "cookie",
			keyPattern: new RegExp("^__utma$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "google-analytics:cookie:8",
			kind: "cookie",
			keyPattern: new RegExp("^_ga$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "google-analytics:cookie:9",
			kind: "cookie",
			keyPattern: new RegExp("^_ga_\\*$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "google-analytics:cookie:10",
			kind: "cookie",
			keyPattern: new RegExp("^_gat$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "google-analytics:scriptContent:11",
			kind: "scriptContent",
			pattern: new RegExp("gtag\\([^)]+'(g-)"),
			version: {
				source: "match",
				template: "$1?ga4:",
			},
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "google-analytics:scriptContent:12",
			kind: "scriptContent",
			pattern: new RegExp("gtag\\([^)]+'(ua-)"),
			version: {
				source: "match",
				template: "$1?ua:",
			},
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "google-analytics:resourceUrl:modern:0",
			kind: "resourceUrl",
			pattern: new RegExp("\\/ga\\.js"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "google-analytics:resourceUrl:modern:1",
			kind: "resourceUrl",
			pattern: new RegExp("googletagmanager\\.com\\/gtag\\/js\\?id=G-[A-Z0-9]+"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "google-analytics:resourceUrl:modern:2",
			kind: "resourceUrl",
			pattern: new RegExp("googletagmanager\\.com\\/gtag\\/js\\?id=AW-\\d+"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "google-analytics:resourceUrl:modern:3",
			kind: "resourceUrl",
			pattern: new RegExp("googletagmanager\\.com\\/gtm\\.js"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "google-analytics:resourceUrl:modern:4",
			kind: "resourceUrl",
			pattern: new RegExp("googletagmanager\\.com\\/gtag\\/js"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
