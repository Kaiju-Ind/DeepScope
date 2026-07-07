import type { TechnologyDefinition } from '../../types';

export const plateTechnologyDefinition = {
	id: "plate",
	name: "Plate",
	website: "https://www.getplate.com",
	description: "Plate is a multisite content management system designed to manage and publish digital content across multiple websites from a centralized platform.",
	icon: "Plate.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "plate:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Plate$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "plate:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^plate$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
