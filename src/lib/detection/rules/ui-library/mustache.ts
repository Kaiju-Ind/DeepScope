import type { TechnologyDefinition } from '../../types';

export const mustacheTechnologyDefinition = {
	id: "mustache",
	name: "Mustache",
	website: "https://mustache.github.io",
	description: "Mustache is a web template system.",
	icon: "Mustache.png",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "mustache:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("mustache(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mustache:jsGlobal:1",
			kind: "jsGlobal",
			property: "Mustache.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
