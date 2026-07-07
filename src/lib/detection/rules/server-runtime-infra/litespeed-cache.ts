import type { TechnologyDefinition } from '../../types';

export const litespeedCacheTechnologyDefinition = {
	id: "litespeed-cache",
	name: "LiteSpeed Cache",
	website: "https://wordpress.org/plugins/litespeed-cache/",
	description: "LiteSpeed Cache is an all-in-one site acceleration plugin for WordPress.",
	icon: "litespeed-cache.png",
	categories: [
		"server-runtime-infra",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "litespeed-cache:header:0",
			kind: "header",
			key: "x-turbo-charged-by",
			valuePattern: new RegExp("LiteSpeed", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "litespeed-cache:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("wp-content\\/plugins\\/litespeed-cache\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "litespeed-cache:jsGlobal:2",
			kind: "jsGlobal",
			property: "litespeed_docref",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "litespeed-cache:header:3",
			kind: "header",
			key: "x-turbo-charged-by",
			valuePattern: new RegExp("litespeed", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:litespeedtech:litespeed_cache:*:*:*:*:*:wordpress:*:*",
	},
	implies: [
		"litespeed",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
