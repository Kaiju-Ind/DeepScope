import type { TechnologyDefinition } from '../../types';

export const omiseTechnologyDefinition = {
	id: "omise",
	name: "Omise",
	website: "https://www.omise.co",
	description: "Omise is a payment gateway for Thailand, Japan and Singapore. Providing both online and offline payment solutions to merchants.",
	icon: "Omise.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "omise:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.omise\\.co"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "omise:jsGlobal:1",
			kind: "jsGlobal",
			property: "Omise",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "omise:jsGlobal:2",
			kind: "jsGlobal",
			property: "OmiseCard",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
