import type { TechnologyDefinition } from '../../types';

export const billgangTechnologyDefinition = {
	id: "billgang",
	name: "Billgang",
	website: "https://billgang.com",
	description: "Billgang is a digital commerce platform built for internet entrepreneurs.",
	icon: "Billgang.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "billgang:dom:0",
			kind: "dom",
			selector: "link[href*='.billgang.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
