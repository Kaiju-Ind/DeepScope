import type { TechnologyDefinition } from '../../types';

export const bitrix24TechnologyDefinition = {
	id: "bitrix24",
	name: "Bitrix24",
	website: "https://www.bitrix24.com",
	description: "Bitrix24 is a set of tools for the organization and management of business processes.",
	icon: "Bitrix24.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "bitrix24:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.bitrix24\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bitrix24:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.bitrix24\\..+\\/bitrix\\/js\\/crm\\/form_loader\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bitrix24:jsGlobal:2",
			kind: "jsGlobal",
			property: "Bitrix24FormLoader",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bitrix24:jsGlobal:3",
			kind: "jsGlobal",
			property: "Bitrix24FormObject",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bitrix24:jsGlobal:4",
			kind: "jsGlobal",
			property: "b24Tracker",
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
		cpe: "cpe:2.3:a:bitrix24:bitrix24:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
