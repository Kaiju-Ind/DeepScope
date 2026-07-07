import type { TechnologyDefinition } from '../../types';

export const resdiaryTechnologyDefinition = {
	id: "resdiary",
	name: "ResDiary",
	website: "https://www.resdiary.com",
	description: "ResDiary, is an online reservation system for hospitality operators.",
	icon: "ResDiary.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "resdiary:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.resdiary\\.\\w+\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "resdiary:dom:1",
			kind: "dom",
			selector: "iframe[src*='resdiary']",
			description: "DOM selector matches a known technology marker.",
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
