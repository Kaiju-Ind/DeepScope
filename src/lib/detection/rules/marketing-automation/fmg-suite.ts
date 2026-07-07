import type { TechnologyDefinition } from '../../types';

export const fmgSuiteTechnologyDefinition = {
	id: "fmg-suite",
	name: "FMG Suite",
	website: "https://fmgsuite.com",
	description: "FMG Suite is an automated content marketing system for financial advisors.",
	icon: "FMGSuite.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "fmg-suite:jsGlobal:0",
			kind: "jsGlobal",
			property: "FMG.EbookBGType",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "fmg-suite:jsGlobal:1",
			kind: "jsGlobal",
			property: "fmgjQuery.Animation",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "fmg-suite:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^FMG Suite$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "fmg-suite:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^fmg suite$", "i"),
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
	requires: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
