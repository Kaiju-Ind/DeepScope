import type { TechnologyDefinition } from '../../types';

export const pluraloTechnologyDefinition = {
	id: "pluralo",
	name: "Pluralo",
	website: "https://pluralo.com",
	description: "Pluralo is an online booking platform that enables users to schedule and manage reservations across various services.",
	icon: "Pluralo.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "pluralo:dom:0",
			kind: "dom",
			selector: "iframe[src*='widget.pluralo.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
