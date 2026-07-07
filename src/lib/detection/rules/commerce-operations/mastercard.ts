import type { TechnologyDefinition } from '../../types';

export const mastercardTechnologyDefinition = {
	id: "mastercard",
	name: "Mastercard",
	website: "https://www.mastercard.com",
	description: "MasterCard facilitates electronic funds transfers throughout the world, most commonly through branded credit cards, debit cards and prepaid cards.",
	icon: "Mastercard.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "mastercard:dom:0",
			kind: "dom",
			selector: "[aria-labelledby='pi-mastercard'], [aria-labelledby='pi-master']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
