import type { TechnologyDefinition } from '../../types';

export const aplazameTechnologyDefinition = {
	id: "aplazame",
	name: "Aplazame",
	website: "https://aplazame.com",
	description: "Aplazame is a consumer credit company that provides instant financing service for online purchases. It combines an overtime payment method integrated at the ecommerce checkout with marketing tools to enable ecommerce to use financing as a promotional lever to boost sales.",
	icon: "Aplazame.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "aplazame:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.aplazame\\.com\\/aplazame\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "aplazame:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("aplazame\\.com\\/static\\/aplazame\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "aplazame:jsGlobal:2",
			kind: "jsGlobal",
			property: "aplazame",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
