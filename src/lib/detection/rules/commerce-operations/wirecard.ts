import type { TechnologyDefinition } from '../../types';

export const wirecardTechnologyDefinition = {
	id: "wirecard",
	name: "Wirecard",
	website: "https://www.wirecard.com",
	description: "Wirecard is a defunct German payment processor and financial services provider.",
	icon: "Wirecard.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "wirecard:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.wirecard\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wirecard:jsGlobal:1",
			kind: "jsGlobal",
			property: "WirecardHPP",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wirecard:jsGlobal:2",
			kind: "jsGlobal",
			property: "WirecardPaymentPage",
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
