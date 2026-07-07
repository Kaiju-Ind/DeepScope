import type { TechnologyDefinition } from '../../types';

export const venmoTechnologyDefinition = {
	id: "venmo",
	name: "Venmo",
	website: "https://venmo.com",
	description: "Venmo is a mobile payment service owned by PayPal. Venmo account holders can transfer funds to others via a mobile phone app.",
	icon: "Venmo.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "venmo:dom:0",
			kind: "dom",
			selector: "[aria-labelledby='pi-venmo'], [data-venmo-supported='true']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
