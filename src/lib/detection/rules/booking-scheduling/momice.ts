import type { TechnologyDefinition } from '../../types';

export const momiceTechnologyDefinition = {
	id: "momice",
	name: "Momice",
	website: "https://www.momice.com/nl/welkom",
	description: "Momice is an event management platform that offers tools for organising and managing events.",
	icon: "Momice.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "momice:jsGlobal:0",
			kind: "jsGlobal",
			property: "webpackChunkmomice_eventsite_new",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "momice:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Momice$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "momice:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^momice$", "i"),
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
