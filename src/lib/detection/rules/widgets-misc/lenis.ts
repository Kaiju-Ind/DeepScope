import type { TechnologyDefinition } from '../../types';

export const lenisTechnologyDefinition = {
	id: "lenis",
	name: "Lenis",
	website: "https://lenis.studiofreight.com",
	description: "Lenis is a smooth scroll library to normalise the scrolling experience across devices.",
	icon: "Lenis.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "lenis:jsGlobal:0",
			kind: "jsGlobal",
			property: "lenisVersion",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "lenis:jsGlobal:1",
			kind: "jsGlobal",
			property: "Lenis",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
