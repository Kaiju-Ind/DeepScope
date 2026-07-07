import type { TechnologyDefinition } from '../../types';

export const wordpressSuperCacheTechnologyDefinition = {
	id: "wordpress-super-cache",
	name: "WordPress Super Cache",
	website: "https://z9.io/wp-super-cache/",
	description: "WordPress Super Cache is a static caching plugin for WordPress.",
	icon: "wp_super_cache.png",
	categories: [
		"server-runtime-infra",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "wordpress-super-cache:html:0",
			kind: "html",
			pattern: new RegExp("<!--[^>]+WP-Super-Cache"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "wordpress-super-cache:html:1",
			kind: "html",
			pattern: new RegExp("<!--[^>]+wp-super-cache"),
			description: "HTML contains a known technology signature.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
