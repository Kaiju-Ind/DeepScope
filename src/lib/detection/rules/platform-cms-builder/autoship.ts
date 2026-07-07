import type { TechnologyDefinition } from '../../types';

export const autoshipTechnologyDefinition = {
	id: "autoship",
	name: "autoship",
	website: "https://autoship.cloud",
	description: "autoship is a feature that allows customers to schedule recurring orders and receive savings, enabling merchants to create automated repeat purchases and manage scheduled orders.",
	icon: "autoship.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "autoship:jsGlobal:0",
			kind: "jsGlobal",
			property: "AUTOSHIP_AJAX_URL",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "autoship:jsGlobal:1",
			kind: "jsGlobal",
			property: "AUTOSHIP_API_URL",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "autoship:jsGlobal:2",
			kind: "jsGlobal",
			property: "AUTOSHIP_SITE_URL",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
