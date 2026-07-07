import type { TechnologyDefinition } from '../../types';

export const konvaJsTechnologyDefinition = {
	id: "konva-js",
	name: "Konva.js",
	website: "https://konvajs.org",
	description: "Konva.js is a JavaScript library for creating 2D canvas applications on both desktop and mobile platforms, utilising HTML5.",
	icon: "KonvaJS.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "konva-js:jsGlobal:0",
			kind: "jsGlobal",
			property: "Konva",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "konva-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "Konva.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
