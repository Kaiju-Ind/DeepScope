import type { TechnologyDefinition } from '../../types';

export const yahooWebAnalyticsTechnologyDefinition = {
	id: "yahoo-web-analytics",
	name: "Yahoo! Web Analytics",
	website: "https://web.analytics.yahoo.com",
	icon: "Yahoo.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "yahoo-web-analytics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("d\\.yimg\\.com\\/mi\\/ywa\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "yahoo-web-analytics:jsGlobal:1",
			kind: "jsGlobal",
			property: "YWA",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
