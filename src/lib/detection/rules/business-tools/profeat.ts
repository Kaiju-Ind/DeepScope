import type { TechnologyDefinition } from '../../types';

export const profeatTechnologyDefinition = {
	id: "profeat",
	name: "Profeat",
	website: "https://profeat.team",
	description: "Profeat is a CRM software enabling integration of WhatsApp and Instagram.",
	icon: "Profeat.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "profeat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.profeat\\.team\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
