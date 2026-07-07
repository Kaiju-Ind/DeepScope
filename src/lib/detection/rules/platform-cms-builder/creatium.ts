import type { TechnologyDefinition } from '../../types';

export const creatiumTechnologyDefinition = {
	id: "creatium",
	name: "Creatium",
	website: "https://creatium.io",
	description: "Creatium is a website builder developed in Russia that provides a user-friendly drag-and-drop interface and a variety of customisation options for creating websites without coding knowledge.",
	icon: "Creatium.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "creatium:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Creatium$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "creatium:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^creatium$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
