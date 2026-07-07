import type { TechnologyDefinition } from '../../types';

export const construct3TechnologyDefinition = {
	id: "construct-3",
	name: "Construct 3",
	website: "https://www.construct.net/",
	description: "Construct 3 is a browser-based game development platform that enables the creation of 2D games using a visual, drag-and-drop interface without requiring programming knowledge.",
	icon: "Construct3.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "construct-3:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Construct 3$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "construct-3:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^construct 3$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
