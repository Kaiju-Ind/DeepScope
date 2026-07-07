import type { TechnologyDefinition } from '../../types';

export const turfjsTechnologyDefinition = {
	id: "turfjs",
	name: "TurfJS",
	website: "https://turfjs.org/",
	description: "Turf is a modular geospatial engine written in JavaScript.",
	icon: "TurfJS.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "turfjs:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(turf@[\\d.]+)?\\/?turf\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "turfjs:jsGlobal:1",
			kind: "jsGlobal",
			property: "turf.feature",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "turfjs:jsGlobal:2",
			kind: "jsGlobal",
			property: "turf.point",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "turfjs:jsGlobal:3",
			kind: "jsGlobal",
			property: "turf.random",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
