import type { TechnologyDefinition } from '../../types';

export const truepushTechnologyDefinition = {
	id: "truepush",
	name: "Truepush",
	website: "https://www.truepush.com",
	description: "Truepush is web-based push notification service available for PWA, AMP, WordPress, and Shopify.",
	icon: "truepush.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "truepush:jsGlobal:0",
			kind: "jsGlobal",
			property: "truepush",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "truepush:jsGlobal:1",
			kind: "jsGlobal",
			property: "truepushVersionInfo.key",
			valuePattern: new RegExp("v([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
