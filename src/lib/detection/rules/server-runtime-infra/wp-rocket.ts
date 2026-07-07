import type { TechnologyDefinition } from '../../types';

export const wpRocketTechnologyDefinition = {
	id: "wp-rocket",
	name: "WP Rocket",
	website: "https://wp-rocket.me",
	description: "WP Rocket is a caching and performance optimisation plugin to improve the loading speed of WordPress websites.",
	icon: "WP Rocket.png",
	categories: [
		"server-runtime-infra",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "wp-rocket:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/wp-rocket\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wp-rocket:html:1",
			kind: "html",
			pattern: new RegExp("<!--[^>]+WP Rocket"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "wp-rocket:dom:2",
			kind: "dom",
			selector: "style#wpr-usedcss",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "wp-rocket:jsGlobal:3",
			kind: "jsGlobal",
			property: "RocketLazyLoadScripts",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wp-rocket:jsGlobal:4",
			kind: "jsGlobal",
			property: "RocketPreloadLinksConfig",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wp-rocket:jsGlobal:5",
			kind: "jsGlobal",
			property: "rocket_lazy",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wp-rocket:header:6",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("WP Rocket(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "wp-rocket:jsGlobal:7",
			kind: "jsGlobal",
			property: "RocketBrowserCompatibilityChecker",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wp-rocket:jsGlobal:8",
			kind: "jsGlobal",
			property: "rocket_lazyload_css_data",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wp-rocket:meta:9",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^WP Rocket ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "wp-rocket:html:10",
			kind: "html",
			pattern: new RegExp("<!--[^>]+wp rocket"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "wp-rocket:header:11",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("wp rocket(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:wp-rocket:wp-rocket:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
