import type { TechnologyDefinition } from '../../types';

export const googleOptimizeTechnologyDefinition = {
	id: "google-optimize",
	name: "Google Optimize",
	website: "https://optimize.google.com",
	description: "Google Optimize allows you to test variants of web pages and see how they perform.",
	icon: "Google Optimize.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "google-optimize:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("googleoptimize\\.com\\/optimize\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "google-optimize:jsGlobal:1",
			kind: "jsGlobal",
			property: "google_optimize",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
