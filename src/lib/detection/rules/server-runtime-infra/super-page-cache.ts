import type { TechnologyDefinition } from '../../types';

export const superPageCacheTechnologyDefinition = {
	id: "super-page-cache",
	name: "Super Page Cache",
	website: "https://themeisle.com/plugins/super-page-cache-pro/",
	description: "Super Page Cache is a static caching plugin for WordPress.",
	icon: "super-page-cache.svg",
	categories: [
		"server-runtime-infra",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "super-page-cache:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/(?:wp-cloudflare-page-cache|wp-super-page-cache-pro)\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
