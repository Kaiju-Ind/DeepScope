import type { TechnologyDefinition } from '../../types';

export const markedTechnologyDefinition = {
	id: "marked",
	name: "Marked",
	website: "https://marked.js.org",
	icon: "Marked.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "marked:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/marked(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "marked:jsGlobal:1",
			kind: "jsGlobal",
			property: "marked",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:marked_project:marked:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
