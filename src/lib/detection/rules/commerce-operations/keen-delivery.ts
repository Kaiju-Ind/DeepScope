import type { TechnologyDefinition } from '../../types';

export const keenDeliveryTechnologyDefinition = {
	id: "keen-delivery",
	name: "Keen Delivery",
	website: "https://www.keendelivery.com",
	description: "Keen Delivery is a Dutch shipping platform.",
	icon: "Keen Delivery.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "keen-delivery:text:0",
			kind: "text",
			pattern: new RegExp("\\bKeen Delivery\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
