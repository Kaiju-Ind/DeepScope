import type { TechnologyDefinition } from '../../types';

export const orderingTechnologyDefinition = {
	id: "ordering",
	name: "Ordering",
	website: "https://www.ordering.co",
	description: "Ordering is a multi-store online ordering and delivery platform providing marketing and loyalty tools, along with native apps for businesses.",
	icon: "Ordering.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "ordering:dom:0",
			kind: "dom",
			selector: "link[href*='apiv4.ordering.co']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"onetime",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
