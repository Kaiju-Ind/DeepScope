import type { TechnologyDefinition } from '../../types';

export const detectizrTechnologyDefinition = {
	id: "detectizr",
	name: "Detectizr",
	website: "https://baris.aydinoglu.net/Detectizr",
	description: "Detectizr is a Modernizr extension to detect device, browser, operating system and screen size.",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "detectizr:jsGlobal:0",
			kind: "jsGlobal",
			property: "Detectizr",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"modernizr",
	],
} as const satisfies TechnologyDefinition;
