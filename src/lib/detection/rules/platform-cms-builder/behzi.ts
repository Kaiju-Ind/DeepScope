import type { TechnologyDefinition } from '../../types';

export const behziTechnologyDefinition = {
	id: "behzi",
	name: "Behzi",
	website: "https://behzi.com",
	description: "Behzi is an all-in-one Iranian platform providing services such as event organization, tours, school registrations, and store discounts.",
	icon: "Behzi.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "behzi:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Behzi$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "behzi:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^behzi$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
