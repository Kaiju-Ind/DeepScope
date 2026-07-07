import type { TechnologyDefinition } from '../../types';

export const capsuleCrmTechnologyDefinition = {
	id: "capsule-crm",
	name: "Capsule CRM",
	website: "https://capsulecrm.com",
	description: "Capsule CRM is an online customer relationship management system for managing contacts, sales opportunities, and basic business interactions.",
	icon: "CapsuleCRM.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "capsule-crm:dom:0",
			kind: "dom",
			selector: "form[action*='service.capsulecrm.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
