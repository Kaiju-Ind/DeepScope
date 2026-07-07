import type { TechnologyDefinition } from '../../types';

export const wpStatisticsTechnologyDefinition = {
	id: "wp-statistics",
	name: "WP-Statistics",
	website: "https://wp-statistics.com",
	description: "WP-Statistics is a WordPress plugin which allows you to know your website statistics.",
	icon: "WP-Statistics.svg",
	categories: [
		"analytics",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "wp-statistics:html:0",
			kind: "html",
			pattern: new RegExp("<!-- Analytics by WP-Statistics v([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "wp-statistics:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/wp-statistics/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "wp-statistics:jsGlobal:2",
			kind: "jsGlobal",
			property: "WP_Statistics_http",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wp-statistics:jsGlobal:3",
			kind: "jsGlobal",
			property: "wps_statistics_object",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wp-statistics:html:4",
			kind: "html",
			pattern: new RegExp("<!-- analytics by wp-statistics v([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"onetime",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
