import type { TechnologyDefinition } from '../../types';

export const fourTechnologyDefinition = {
	id: "four",
	name: "Four",
	website: "https://paywithfour.com/",
	description: "Pay with four is a Buy now pay later solution.",
	icon: "Four.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "four:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("scripts\\.paywithfour\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "four:jsGlobal:1",
			kind: "jsGlobal",
			property: "Four",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
