import type { TechnologyDefinition } from '../../types';

export const movableTypeTechnologyDefinition = {
	id: "movable-type",
	name: "Movable Type",
	website: "https://movabletype.org",
	icon: "Movable Type.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "movable-type:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Movable Type", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "movable-type:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("movable type", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:sixapart:movable_type:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
