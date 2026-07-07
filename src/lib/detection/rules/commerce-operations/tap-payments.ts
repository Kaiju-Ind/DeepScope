import type { TechnologyDefinition } from '../../types';

export const tapPaymentsTechnologyDefinition = {
	id: "tap-payments",
	name: "Tap Payments",
	website: "https://www.tap.company",
	description: "Tap Payments is a company based in KSA provides payment services to merchants.",
	icon: "Tap Payments.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "tap-payments:dom:0",
			kind: "dom",
			selector: "iframe[src*='checkout.payments.tap.company/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
