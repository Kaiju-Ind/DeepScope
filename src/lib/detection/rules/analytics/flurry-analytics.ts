import type { TechnologyDefinition } from '../../types';

export const flurryAnalyticsTechnologyDefinition = {
	id: "flurry-analytics",
	name: "Flurry Analytics",
	website: "https://www.flurry.com",
	description: "Flurry Analytics is a tool that provides basic insights into user behavior and app performance, with the option to set up advanced analytics for a deeper understanding of complex user interactions and events.",
	icon: "Flurry.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "flurry-analytics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.flurry\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		cpe: "cpe:2.3:a:flurry:flurry-analytics-android:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
