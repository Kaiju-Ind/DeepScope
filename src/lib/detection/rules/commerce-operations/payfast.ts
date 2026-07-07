import type { TechnologyDefinition } from '../../types';

export const payfastTechnologyDefinition = {
	id: "payfast",
	name: "PayFast",
	website: "https://www.payfast.co.za/",
	description: "PayFast is a payments processing service for South Africans & South African websites.",
	icon: "Payfast.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "payfast:dom:0",
			kind: "dom",
			selector: "[aria-labelledby='pi-payfast_instant_eft']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
