import type { TechnologyDefinition } from '../../types';

export const arnicaTechnologyDefinition = {
	id: "arnica",
	name: "Arnica",
	website: "https://arnica.pro",
	description: "Arnica is a CRM system that consolidates customer relationship processes into a single platform.",
	icon: "Arnica.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "arnica:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.arnica\\.pro"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "arnica:jsGlobal:1",
			kind: "jsGlobal",
			property: "arnicaBooking.init",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
