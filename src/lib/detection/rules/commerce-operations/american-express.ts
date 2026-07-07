import type { TechnologyDefinition } from '../../types';

export const americanExpressTechnologyDefinition = {
	id: "american-express",
	name: "American Express",
	website: "https://www.americanexpress.com",
	description: "American Express, also known as Amex, facilitates electronic funds transfers throughout the world, most commonly through branded credit cards, debit cards and prepaid cards.",
	icon: "Amex.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "american-express:dom:0",
			kind: "dom",
			selector: "[aria-labelledby='pi-american_express']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
