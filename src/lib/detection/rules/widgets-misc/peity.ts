import type { TechnologyDefinition } from '../../types';

export const peityTechnologyDefinition = {
	id: "peity",
	name: "Peity",
	website: "https://benpickles.github.io/peity/",
	description: "Peity is a jQuery plugin that converts an element's content into a simple mini svg pie, line or bar chart.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "peity:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:jquery\\.)?peity(?:-demo)?(?:\\.min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "peity:jsGlobal:1",
			kind: "jsGlobal",
			property: "peity",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "peity:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("jquery\\.peity\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
