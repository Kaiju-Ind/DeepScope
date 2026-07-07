import type { TechnologyDefinition } from '../../types';

export const supersizedTechnologyDefinition = {
	id: "supersized",
	name: "Supersized",
	website: "https://buildinternet.com/project/supersized",
	icon: "Supersized.png",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "supersized:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("supersized(?:\\.([\\d.]*[\\d]))?.*\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
