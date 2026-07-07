import type { TechnologyDefinition } from '../../types';

export const reviefyTechnologyDefinition = {
	id: "reviefy",
	name: "Reviefy",
	website: "https://www.reviefy.com",
	description: "Reviefy is a product review collection solution designed for integration with the MyCashFlow ecommerce platform.",
	icon: "Reviefy.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "reviefy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.reviefy\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "reviefy:jsGlobal:1",
			kind: "jsGlobal",
			property: "Reviefy",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	requires: [
		"mycashflow",
	],
} as const satisfies TechnologyDefinition;
