import type { TechnologyDefinition } from '../../types';

export const wpFastestCacheTechnologyDefinition = {
	id: "wp-fastest-cache",
	name: "WP Fastest Cache",
	website: "https://www.wpfastestcache.com",
	description: "WP Fastest Cache is one of a number of plugins for WordPress designed to accelerate the performance of your website.",
	icon: "WP Fastest Cache.png",
	categories: [
		"wordpress-ecosystem",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "wp-fastest-cache:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/cache\\/wpfc-minified\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wp-fastest-cache:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/cache/wpfc-minified/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "wp-fastest-cache:jsGlobal:2",
			kind: "jsGlobal",
			property: "Wpfcll",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"onetime",
		],
		cpe: "cpe:2.3:a:wpfastestcache:wp_fastest_cache:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
