import type { TechnologyDefinition } from '../../types';

export const podsightsTechnologyDefinition = {
	id: "podsights",
	name: "Podsights",
	website: "https://podsights.com/",
	description: "Podsights is attribution technology platform that brands and agencies use to measure and scale their podcast advertising.",
	icon: "Podsights.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "podsights:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.pdst\\.fm"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
