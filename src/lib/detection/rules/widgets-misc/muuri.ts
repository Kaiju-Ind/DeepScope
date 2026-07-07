import type { TechnologyDefinition } from '../../types';

export const muuriTechnologyDefinition = {
	id: "muuri",
	name: "Muuri",
	website: "https://muuri.dev",
	description: "Muuri is a JavaScript layout engine that allows you to build all kinds of layouts and make them responsive, sortable, filterable, draggable and/or animated.",
	icon: "Muuri.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "muuri:jsGlobal:0",
			kind: "jsGlobal",
			property: "Muuri",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
