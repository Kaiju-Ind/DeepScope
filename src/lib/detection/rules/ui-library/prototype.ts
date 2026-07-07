import type { TechnologyDefinition } from '../../types';

export const prototypeTechnologyDefinition = {
	id: "prototype",
	name: "Prototype",
	website: "https://www.prototypejs.org",
	description: "Prototype is a JavaScript Framework that aims to ease development of web applications.",
	icon: "Prototype.png",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "prototype:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:prototype|protoaculous)(?:-([\\d.]*[\\d]))?.*\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "prototype:jsGlobal:1",
			kind: "jsGlobal",
			property: "Prototype.Version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:prototypejs:prototype:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
