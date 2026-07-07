import type { TechnologyDefinition } from '../../types';

export const prostoyTechnologyDefinition = {
	id: "prostoy",
	name: "Prostoy",
	website: "https://www.prostoy.ru",
	description: "Prostoy is a business CRM system designed for small and medium businesses to manage customer relationships and streamline operations.",
	icon: "Prostoy.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "prostoy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("analytics\\.prostoy\\.ru"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
