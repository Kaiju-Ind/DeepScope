import type { TechnologyDefinition } from '../../types';

export const woosmapTechnologyDefinition = {
	id: "woosmap",
	name: "Woosmap",
	website: "https://www.woosmap.com",
	description: "Woosmap is a store locator widget that displays nearby business locations on a map and provides search, filtering, and geolocation features for websites and applications.",
	icon: "Woosmap.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "woosmap:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.woosmap\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
