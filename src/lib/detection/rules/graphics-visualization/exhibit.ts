import type { TechnologyDefinition } from '../../types';

export const exhibitTechnologyDefinition = {
	id: "exhibit",
	name: "Exhibit",
	website: "https://simile-widgets.org/exhibit/",
	icon: "Exhibit.png",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "exhibit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("exhibit.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "exhibit:jsGlobal:1",
			kind: "jsGlobal",
			property: "Exhibit",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "exhibit:jsGlobal:2",
			kind: "jsGlobal",
			property: "Exhibit.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
