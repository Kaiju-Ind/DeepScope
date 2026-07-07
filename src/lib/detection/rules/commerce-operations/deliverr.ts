import type { TechnologyDefinition } from '../../types';

export const deliverrTechnologyDefinition = {
	id: "deliverr",
	name: "Deliverr",
	website: "https://deliverr.com",
	description: "Deliverr is a fulfillment service that facilitates shipping services for ecommerce businesses.",
	icon: "Deliverr.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "deliverr:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("fast-tags\\.deliverr\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "deliverr:jsGlobal:1",
			kind: "jsGlobal",
			property: "deliverrScript",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
			"recurring",
		],
	},
	implies: [
		"cart-functionality",
	],
} as const satisfies TechnologyDefinition;
