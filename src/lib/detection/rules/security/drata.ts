import type { TechnologyDefinition } from '../../types';

export const drataTechnologyDefinition = {
	id: "drata",
	name: "Drata",
	website: "https://drata.com",
	description: "Drata is an automated site compliance system designed to streamline and manage security and privacy requirements.",
	icon: "Drata.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "drata:jsGlobal:0",
			kind: "jsGlobal",
			property: "webpackChunkdrata_web",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "drata:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("Drata Inc.", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "drata:meta:2",
			kind: "meta",
			key: "copyright",
			valuePattern: new RegExp("Drata Inc.", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "drata:meta:3",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("drata inc.", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "drata:meta:4",
			kind: "meta",
			key: "copyright",
			valuePattern: new RegExp("drata inc.", "i"),
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
