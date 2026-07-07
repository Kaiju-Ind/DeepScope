import type { TechnologyDefinition } from '../../types';

export const bmtMicroTechnologyDefinition = {
	id: "bmt-micro",
	name: "BMT Micro",
	website: "https://bmtmicro.com",
	description: "BMT Micro is a provider of turnkey e-commerce solutions and order fulfillment services for digital and physical products.",
	icon: "BMTMicro.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "bmt-micro:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("secure\\.bmtmicro\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bmt-micro:jsGlobal:1",
			kind: "jsGlobal",
			property: "bmt_ShoppingCart",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bmt-micro:jsGlobal:2",
			kind: "jsGlobal",
			property: "bmt_showcart",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
