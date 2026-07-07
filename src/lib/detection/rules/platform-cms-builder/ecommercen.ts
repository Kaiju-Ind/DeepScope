import type { TechnologyDefinition } from '../../types';

export const ecommercenTechnologyDefinition = {
	id: "ecommercen",
	name: "Ecommercen",
	website: "https://www.ecommercen.com",
	description: "Ecommercen is an ecommerce solution designed to facilitate online sales, manage transactions, and streamline the customer shopping experience.",
	icon: "Ecommercen.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ecommercen:jsGlobal:0",
			kind: "jsGlobal",
			property: "EcomnTag.Tag",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ecommercen:jsGlobal:1",
			kind: "jsGlobal",
			property: "ecomnTag.dataLayer",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
