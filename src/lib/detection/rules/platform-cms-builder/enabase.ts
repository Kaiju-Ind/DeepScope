import type { TechnologyDefinition } from '../../types';

export const enabaseTechnologyDefinition = {
	id: "enabase",
	name: "Enabase",
	website: "https://www.enabase.com/",
	description: "Enabase is a unified platform for managing web, ecommerce, e-transformation, pre-accounting, and sales channels.",
	icon: "Enabase.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "enabase:jsGlobal:0",
			kind: "jsGlobal",
			property: "Enabase.platform",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "enabase:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Enabase$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "enabase:meta:2",
			kind: "meta",
			key: "publisher",
			valuePattern: new RegExp("^Enabase$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "enabase:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^enabase$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "enabase:meta:4",
			kind: "meta",
			key: "publisher",
			valuePattern: new RegExp("^enabase$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
