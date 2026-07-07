import type { TechnologyDefinition } from '../../types';

export const oleoshopTechnologyDefinition = {
	id: "oleoshop",
	name: "Oleoshop",
	website: "https://www.oleoshop.com",
	description: "Oleoshop is a platform that enables businesses to create and manage their own online stores.",
	icon: "Oleoshop.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "oleoshop:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Oleoshop\\.com", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "oleoshop:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("oleoshop\\.com", "i"),
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
