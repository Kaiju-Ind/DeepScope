import type { TechnologyDefinition } from '../../types';

export const paycoveTechnologyDefinition = {
	id: "paycove",
	name: "Paycove",
	website: "https://www.paycove.io",
	description: "Paycove is a revenue operations platform that unifies payments, billing, and reporting in a single system to streamline financial workflows and provide centralized visibility into transactions.",
	icon: "Paycove.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "paycove:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("paycove\\.io\\/js\\/"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
