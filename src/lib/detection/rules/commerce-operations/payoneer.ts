import type { TechnologyDefinition } from '../../types';

export const payoneerTechnologyDefinition = {
	id: "payoneer",
	name: "Payoneer",
	website: "https://www.payoneer.com",
	description: "Payoneer is an online payment processing platform tailored for digital businesses.",
	icon: "Payoneer.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "payoneer:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/wc-payoneer-payment-gateway/'], link#payoneer-plugn-css",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
