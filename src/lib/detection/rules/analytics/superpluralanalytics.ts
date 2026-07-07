import type { TechnologyDefinition } from '../../types';

export const superpluralanalyticsTechnologyDefinition = {
	id: "superpluralanalytics",
	name: "SuperPluralAnalytics",
	website: "https://superplural.com/analytics/",
	description: "SuperPluralAnalytics is a web analytics platform that collects, measures, and reports website traffic data to help understand user behavior and site performance.",
	icon: "SuperPlural.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "superpluralanalytics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.superplural\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "superpluralanalytics:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.superplural\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
