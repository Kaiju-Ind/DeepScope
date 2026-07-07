import type { TechnologyDefinition } from '../../types';

export const crmboostTechnologyDefinition = {
	id: "crmboost",
	name: "CRMBOOST",
	website: "https://www.crmboost.com",
	description: "CRMBOOST is a customer relationship management (CRM) platform that helps businesses organize, track, and manage interactions with clients and leads.",
	icon: "CRMBOOST.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "crmboost:dom:0",
			kind: "dom",
			selector: "iframe[src*='.crmboost.com'], form[action*='crmboost.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
