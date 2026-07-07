import type { TechnologyDefinition } from '../../types';

export const loyalisTechnologyDefinition = {
	id: "loyalis",
	name: "Loyalis",
	website: "https://www.loyalis.nl",
	description: "Loyalis is a loyalty program for ecommerce that enables businesses to reward customers based on purchases and engagement.",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "loyalis:jsGlobal:0",
			kind: "jsGlobal",
			property: "loyalisOptions.key",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
