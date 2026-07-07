import type { TechnologyDefinition } from '../../types';

export const nelioTestingTechnologyDefinition = {
	id: "nelio-testing",
	name: "Nelio Testing",
	website: "https://neliosoftware.com/testing",
	description: "Nelio Testing is a plugin that allows testing everything on a WordPress site.",
	icon: "NelioTesting.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "nelio-testing:jsGlobal:0",
			kind: "jsGlobal",
			property: "nabSettings",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "nelio-testing:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^nabUniqueViews$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "nelio-testing:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^nabuniqueviews$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
		cpe: "cpe:2.3:a:neliosoftware:nelio_ab_testing:*:*:*:*:*:*:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
