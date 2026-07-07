import type { TechnologyDefinition } from '../../types';

export const gojsTechnologyDefinition = {
	id: "gojs",
	name: "GoJS",
	website: "https://gojs.net/",
	icon: "GoJS.png",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "gojs:jsGlobal:0",
			kind: "jsGlobal",
			property: "go.GraphObject",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gojs:jsGlobal:1",
			kind: "jsGlobal",
			property: "go.version",
			valuePattern: new RegExp("(.*)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
