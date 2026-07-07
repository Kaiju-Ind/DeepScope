import type { TechnologyDefinition } from '../../types';

export const moyasarTechnologyDefinition = {
	id: "moyasar",
	name: "Moyasar",
	website: "https://moyasar.com/en",
	description: "Moyasar is a payment gateway platform for accepting online payments in Saudi Arabia and the MENA region.",
	icon: "Moyasar.png",
	categories: [
		"commerce-operations",
	],
	rules: [],
} as const satisfies TechnologyDefinition;
