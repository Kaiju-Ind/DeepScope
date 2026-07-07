import type { TechnologyDefinition } from '../../types';

export const neonCrmTechnologyDefinition = {
	id: "neon-crm",
	name: "Neon CRM",
	website: "https://neonone.com",
	description: "Neon CRM, a Neon One company, is a cloud-based customer relationship management (CRM) software suite for nonprofits of all sizes. Applications include fundraising management, donor management, membership management, event registration and management, customised reporting, and more.",
	icon: "Neon One.svg",
	categories: [
		"business-tools",
		"fundraising-donations",
	],
	rules: [
		{
			id: "neon-crm:dom:0",
			kind: "dom",
			selector: "a[href*='.app.neoncrm.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "neon-crm:jsGlobal:1",
			kind: "jsGlobal",
			property: "_neoncrm_ga",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "neon-crm:jsGlobal:2",
			kind: "jsGlobal",
			property: "neonPayCard",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "neon-crm:jsGlobal:3",
			kind: "jsGlobal",
			property: "neoncrm_email_ajax_object",
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
