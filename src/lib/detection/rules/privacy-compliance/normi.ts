import type { TechnologyDefinition } from '../../types';

export const normiTechnologyDefinition = {
	id: "normi",
	name: "Normi",
	website: "https://normi.ca",
	description: "Normi is a Compliance Management Platform designed to ensure adherence to Quebec's C-25 regulation.",
	icon: "Normi.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "normi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.normi\\.ca\\/"),
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
