import type { TechnologyDefinition } from '../../types';

export const squireTechnologyDefinition = {
	id: "squire",
	name: "Squire",
	website: "https://getsquire.com",
	description: "Squire is a business management platform for barbershops, offering appointment scheduling, payment processing, and customer relationship management tools​.",
	icon: "Squire.svg",
	categories: [
		"booking-scheduling",
		"business-tools",
		"commerce-operations",
	],
	rules: [
		{
			id: "squire:jsGlobal:0",
			kind: "jsGlobal",
			property: "SquireWidget",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "squire:jsGlobal:1",
			kind: "jsGlobal",
			property: "_squireQueryClient",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "squire:jsGlobal:2",
			kind: "jsGlobal",
			property: "_squireWidgetConfig",
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
