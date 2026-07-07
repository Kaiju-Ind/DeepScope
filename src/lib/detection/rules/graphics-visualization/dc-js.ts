import type { TechnologyDefinition } from '../../types';

export const dcJsTechnologyDefinition = {
	id: "dc-js",
	name: "dc.js",
	website: "https://dc-js.github.io/dc.js/",
	description: "A multi-dimensional charting library built to work natively with crossfilter and rendered using d3.js",
	icon: "dc.js.png",
	categories: [
		"graphics-visualization",
		"widgets-misc",
	],
	rules: [
		{
			id: "dc-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:((?:\\d+\\.)+\\d+)\\/(?:dc\\/)?)?dc(?:\\.leaflet)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "dc-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "dcAPIKey",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
