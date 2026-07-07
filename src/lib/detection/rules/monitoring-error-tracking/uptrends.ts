import type { TechnologyDefinition } from '../../types';

export const uptrendsTechnologyDefinition = {
	id: "uptrends",
	name: "Uptrends",
	website: "https://www.uptrends.com",
	description: "Uptrends is a website and web performance monitoring solution.",
	icon: "Uptrends.svg",
	categories: [
		"monitoring-error-tracking",
		"developer-tooling",
	],
	rules: [
		{
			id: "uptrends:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.uptrendsdata\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "uptrends:jsGlobal:1",
			kind: "jsGlobal",
			property: "UTBOOMR.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
