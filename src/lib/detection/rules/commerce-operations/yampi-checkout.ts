import type { TechnologyDefinition } from '../../types';

export const yampiCheckoutTechnologyDefinition = {
	id: "yampi-checkout",
	name: "Yampi Checkout",
	website: "https://www.yampi.com.br/checkout",
	description: "Yampi Checkout is an payment processor from Brazil.",
	icon: "Yampi.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "yampi-checkout:jsGlobal:0",
			kind: "jsGlobal",
			property: "yampiCheckoutUrl",
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
