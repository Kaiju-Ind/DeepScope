import type { TechnologyDefinition } from '../../types';

export const c3JsTechnologyDefinition = {
	id: "c3-js",
	name: "C3.js",
	website: "https://c3js.org/",
	description: "D3 based reusable chart library",
	icon: "C3.js.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "c3-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("c3(?:\\.min)?(?:-[a-zA-Z0-9]{8})?\\.js(?:\\?ver=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "c3-js:jsGlobal:0",
			kind: "jsGlobal",
			property: "c3.generate",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	requires: [
		"d3",
	],
} as const satisfies TechnologyDefinition;
