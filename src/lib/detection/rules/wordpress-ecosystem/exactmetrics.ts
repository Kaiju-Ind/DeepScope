import type { TechnologyDefinition } from '../../types';

export const exactmetricsTechnologyDefinition = {
	id: "exactmetrics",
	name: "ExactMetrics",
	website: "https://www.exactmetrics.com",
	description: "ExactMetrics (formerly Google Analytics Dashboard for WP) plugin helps you properly setup all the powerful Google Analytics tracking features without writing any code or hiring a developer.",
	icon: "ExactMetrics.svg",
	categories: [
		"wordpress-ecosystem",
		"analytics",
	],
	rules: [
		{
			id: "exactmetrics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/google-analytics-dashboard-for-wp\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "exactmetrics:jsGlobal:1",
			kind: "jsGlobal",
			property: "ExactMetrics",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "exactmetrics:jsGlobal:2",
			kind: "jsGlobal",
			property: "exactmetrics_frontend",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:monsterinsights:exactmetrics:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
