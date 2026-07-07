import type { TechnologyDefinition } from '../../types';

export const menuuTechnologyDefinition = {
	id: "menuu",
	name: "Menuu",
	website: "https://menuu.com",
	description: "MENUU is an online ordering system for restaurants and food delivery.",
	icon: "Menuu.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "menuu:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("frontend\\.menuu\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "menuu:header:1",
			kind: "header",
			key: "Access-Control-Allow-Origin",
			valuePattern: new RegExp("frontend\\.menuu\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "menuu:header:2",
			kind: "header",
			key: "access-control-allow-origin",
			valuePattern: new RegExp("frontend\\.menuu\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
