import type { TechnologyDefinition } from '../../types';

export const cybersourceTechnologyDefinition = {
	id: "cybersource",
	name: "Cybersource",
	website: "https://www.cybersource.com/",
	description: "Cybersource is an ecommerce credit card payment system solution.",
	icon: "cybersource.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "cybersource:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cybersource\\..+\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
