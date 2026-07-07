import type { TechnologyDefinition } from '../../types';

export const wpOptimizeTechnologyDefinition = {
	id: "wp-optimize",
	name: "WP-Optimize",
	website: "https://getwpo.com",
	description: "WP-Optimize is an all-in-one WordPress plugin that cleans your database, compresses your large images and caches your site.",
	icon: "WP-Optimize.png",
	categories: [
		"wordpress-ecosystem",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "wp-optimize:html:0",
			kind: "html",
			pattern: new RegExp("<!--[^>]+Cached by WP-Optimize"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "wp-optimize:html:1",
			kind: "html",
			pattern: new RegExp("<!--[^>]+cached by wp-optimize"),
			description: "HTML contains a known technology signature.",
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
