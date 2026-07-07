import type { TechnologyDefinition } from '../../types';

export const powerCrmTechnologyDefinition = {
	id: "power-crm",
	name: "Power CRM",
	website: "https://site.powercrm.com.br",
	description: "Power CRM is a platform tailored for vehicle protection associations, offering support to meet operational needs.",
	icon: "PowerCRM.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "power-crm:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.powercrm\\.com\\.br"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "power-crm:jsGlobal:1",
			kind: "jsGlobal",
			property: "PowerCRM.init",
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
