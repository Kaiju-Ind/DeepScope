import type { TechnologyDefinition } from '../../types';

export const apxiumTechnologyDefinition = {
	id: "apxium",
	name: "Apxium",
	website: "https://www.apxium.com",
	description: "Apxium is a software solution designed for automating accounts payable processes.",
	icon: "Apxium.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "apxium:dom:0",
			kind: "dom",
			selector: "div > apx-appskin-page-header",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
