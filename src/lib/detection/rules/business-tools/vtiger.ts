import type { TechnologyDefinition } from '../../types';

export const vtigerTechnologyDefinition = {
	id: "vtiger",
	name: "Vtiger",
	website: "https://www.vtiger.com",
	description: "Vtiger is a cloud-based suite of marketing, sales and help desk offerings, which can be deployed separately or as an integrated, all-in-one ecosystem.",
	icon: "Vtiger.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "vtiger:jsGlobal:0",
			kind: "jsGlobal",
			property: "Vtiger",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "vtiger:jsGlobal:1",
			kind: "jsGlobal",
			property: "Vtiger_Base_Js",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "vtiger:jsGlobal:2",
			kind: "jsGlobal",
			property: "Vtiger_Helper_Js",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
		cpe: "cpe:2.3:a:vtiger:vtiger_crm:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
