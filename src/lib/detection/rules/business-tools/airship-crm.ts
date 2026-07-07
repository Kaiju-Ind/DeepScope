import type { TechnologyDefinition } from '../../types';

export const airshipCrmTechnologyDefinition = {
	id: "airship-crm",
	name: "Airship CRM",
	website: "https://airship.co.uk",
	description: "Airship CRM is a hospitality-focused platform that centralizes data, enables tailored email communication, and enhances visit frequency.",
	icon: "AirshipCRM.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "airship-crm:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.airship\\.co\\.uk\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
