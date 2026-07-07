import type { TechnologyDefinition } from '../../types';

export const erpnextTechnologyDefinition = {
	id: "erpnext",
	name: "ERPNext",
	website: "https://erpnext.com",
	description: "ERPNext is a free and open-source integrated Enterprise Resource Planning (ERP) software developed by Frappe Technologies.",
	icon: "ERPNext.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "erpnext:jsGlobal:0",
			kind: "jsGlobal",
			property: "erpnext.shopping_cart",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "erpnext:jsGlobal:1",
			kind: "jsGlobal",
			property: "erpnext.subscribe_to_newsletter",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"mid",
			"recurring",
		],
		cpe: "cpe:2.3:a:frappe:erpnext:*:*:*:*:*:*:*:*",
	},
	implies: [
		"frappe",
	],
} as const satisfies TechnologyDefinition;
