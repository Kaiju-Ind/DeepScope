import type { TechnologyDefinition } from '../../types';

export const billmanagerTechnologyDefinition = {
	id: "billmanager",
	name: "BILLmanager",
	website: "https://www.ispsystem.ru/billmanager-host",
	description: "BILLmanager is a hosting billing panel used to manage service provisioning, invoicing, and client accounts for hosting providers.",
	icon: "BILLmanager.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "billmanager:jsGlobal:0",
			kind: "jsGlobal",
			property: "binary",
			valuePattern: new RegExp("\\/manager\\/billmgr"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "billmanager:jsGlobal:1",
			kind: "jsGlobal",
			property: "pageInfo.binary",
			valuePattern: new RegExp("\\/billmgr"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
