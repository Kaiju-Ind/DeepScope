import type { TechnologyDefinition } from '../../types';

export const aseqbaseTechnologyDefinition = {
	id: "aseqbase",
	name: "Aseqbase",
	website: "https://aseqbase.mimfa.net",
	description: "Aseqbase is a sequence-based web development framework designed to create robust websites.",
	icon: "Aseqbase.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "aseqbase:meta:0",
			kind: "meta",
			key: "framwork",
			valuePattern: new RegExp("^aseqbase$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "aseqbase:meta:1",
			kind: "meta",
			key: "product",
			valuePattern: new RegExp("www\\.aseqbase\\.ir", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
