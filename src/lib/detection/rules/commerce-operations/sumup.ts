import type { TechnologyDefinition } from '../../types';

export const sumupTechnologyDefinition = {
	id: "sumup",
	name: "SumUp",
	website: "https://www.sumup.com",
	description: "SumUp is a provider of payment acceptance solutions.",
	icon: "SumUp.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "sumup:jsGlobal:0",
			kind: "jsGlobal",
			property: "SumUpCard.debug",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sumup:jsGlobal:1",
			kind: "jsGlobal",
			property: "SumUpPayment.debug",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
