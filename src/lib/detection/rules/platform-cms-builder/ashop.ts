import type { TechnologyDefinition } from '../../types';

export const ashopTechnologyDefinition = {
	id: "ashop",
	name: "Ashop",
	website: "https://www.ashop.com.au",
	description: "Ashop is a hosted shopping cart software solution for creating and managing an online store.",
	icon: "Ashop.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ashop:jsGlobal:0",
			kind: "jsGlobal",
			property: "AshopKissMetricsAddClickEvent",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ashop:jsGlobal:1",
			kind: "jsGlobal",
			property: "AshopKissMetricsAddEvent",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ashop:jsGlobal:2",
			kind: "jsGlobal",
			property: "AshopKissMetricsAddIdentity",
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
