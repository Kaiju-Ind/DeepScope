import type { TechnologyDefinition } from '../../types';

export const frappeTechnologyDefinition = {
	id: "frappe",
	name: "Frappe",
	website: "https://frappeframework.com",
	description: "Frappe is a full stack, batteries-included, web framework written in Python and Javascript.",
	icon: "Frappe.png",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "frappe:jsGlobal:0",
			kind: "jsGlobal",
			property: "frappe.avatar",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "frappe:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^frappe$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:frappe:frappe:*:*:*:*:*:*:*:*",
	},
	implies: [
		"mariadb",
		"python",
	],
} as const satisfies TechnologyDefinition;
