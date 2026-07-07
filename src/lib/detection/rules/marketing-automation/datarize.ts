import type { TechnologyDefinition } from '../../types';

export const datarizeTechnologyDefinition = {
	id: "datarize",
	name: "Datarize",
	website: "https://datarize.ai",
	description: "Datarize is a CRM marketing solution designed to streamline customer relationship management and enhance targeted marketing efforts.",
	icon: "Datarize.svg",
	categories: [
		"marketing-automation",
		"business-tools",
	],
	rules: [
		{
			id: "datarize:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.datarize\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
