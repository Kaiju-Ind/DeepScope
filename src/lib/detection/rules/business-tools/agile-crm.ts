import type { TechnologyDefinition } from '../../types';

export const agileCrmTechnologyDefinition = {
	id: "agile-crm",
	name: "Agile CRM",
	website: "https://www.agilecrm.com",
	description: "Agile CRM is a software for Customer Relationship Management (CRM) that provides sales and marketing automation features for businesses.",
	icon: "AgileCRM.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "agile-crm:jsGlobal:0",
			kind: "jsGlobal",
			property: "AgileCRMTracker",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "agile-crm:jsGlobal:1",
			kind: "jsGlobal",
			property: "Agile_API",
			description: "Page-owned global matches a known technology marker.",
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
