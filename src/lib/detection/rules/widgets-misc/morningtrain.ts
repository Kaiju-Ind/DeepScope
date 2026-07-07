import type { TechnologyDefinition } from '../../types';

export const morningtrainTechnologyDefinition = {
	id: "morningtrain",
	name: "Morningtrain",
	website: "https://morningtrain.dk/vi-lukker-morningcatch",
	description: "Morningtrain is a pop-up window tool designed in Denmark for generating and capturing leads through on-site user engagement.",
	icon: "Morningtrain.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "morningtrain:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.morningcatch\\.net"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "morningtrain:meta:1",
			kind: "meta",
			key: "designer",
			valuePattern: new RegExp("^Morning Train$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "morningtrain:meta:2",
			kind: "meta",
			key: "designer",
			valuePattern: new RegExp("^morning train$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
