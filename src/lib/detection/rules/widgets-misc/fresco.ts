import type { TechnologyDefinition } from '../../types';

export const frescoTechnologyDefinition = {
	id: "fresco",
	name: "Fresco",
	website: "https://github.com/staaky/fresco",
	description: "Fresco is a responsive lightbox. Fresco comes with thumbnail support, fullscreen zoom, Youtube and Vimeo integration for HTML5 video and a powerful Javascript API.",
	icon: "default.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "fresco:jsGlobal:0",
			kind: "jsGlobal",
			property: "Fresco.version",
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
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
