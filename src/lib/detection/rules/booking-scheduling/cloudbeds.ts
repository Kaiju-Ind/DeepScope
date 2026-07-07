import type { TechnologyDefinition } from '../../types';

export const cloudbedsTechnologyDefinition = {
	id: "cloudbeds",
	name: "Cloudbeds",
	website: "https://www.cloudbeds.com",
	description: "Cloudbeds is a cloud-based hotel management platform which includes tools for managing reservations, availability, rates, distribution channels, payments, guests, housekeeping, and more.",
	icon: "Cloudbeds.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "cloudbeds:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.cloudbeds\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cloudbeds:dom:1",
			kind: "dom",
			selector: "a[href*='.cloudbeds.com/'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "cloudbeds:jsGlobal:2",
			kind: "jsGlobal",
			property: "CloudBeds_widget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
