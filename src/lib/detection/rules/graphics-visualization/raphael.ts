import type { TechnologyDefinition } from '../../types';

export const raphaelTechnologyDefinition = {
	id: "raphael",
	name: "Raphael",
	website: "https://dmitrybaranovskiy.github.io/raphael/",
	description: "Raphael is a cross-browser JavaScript library that draws Vector graphics for websites.",
	icon: "Raphael.png",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "raphael:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("raphael(?:-([\\d.]+))?(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "raphael:jsGlobal:1",
			kind: "jsGlobal",
			property: "Raphael.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
