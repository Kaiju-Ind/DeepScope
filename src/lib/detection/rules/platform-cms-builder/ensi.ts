import type { TechnologyDefinition } from '../../types';

export const ensiTechnologyDefinition = {
	id: "ensi",
	name: "Ensi",
	website: "https://ensi.tech",
	description: "Ensi is an open source ecommerce platform based on service oriented architecture.",
	icon: "Ensi.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ensi:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Ensi Platform", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "ensi:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("ensi platform", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
