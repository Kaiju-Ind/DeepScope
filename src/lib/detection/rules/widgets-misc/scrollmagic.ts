import type { TechnologyDefinition } from '../../types';

export const scrollmagicTechnologyDefinition = {
	id: "scrollmagic",
	name: "ScrollMagic",
	website: "https://scrollmagic.io",
	description: "ScrollMagic is a jQuery plugin which essentially lets you use the scrollbar like a playback scrub control.",
	icon: "ScrollMagic.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "scrollmagic:jsGlobal:0",
			kind: "jsGlobal",
			property: "ScrollMagic",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "scrollmagic:jsGlobal:1",
			kind: "jsGlobal",
			property: "ScrollMagic.version",
			valuePattern: new RegExp("^([\\d\\.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"gsap",
		"jquery",
	],
} as const satisfies TechnologyDefinition;
