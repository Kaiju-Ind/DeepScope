import type { TechnologyDefinition } from '../../types';

export const catchTechnologyDefinition = {
	id: "catch",
	name: "Catch",
	website: "https://www.getcatch.com/",
	description: "Catch is a payment solution which allows merchants to use payments via bank payments instead of credit/debit cards.",
	icon: "Catch.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "catch:jsGlobal:0",
			kind: "jsGlobal",
			property: "Catch",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
