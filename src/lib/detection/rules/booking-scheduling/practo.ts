import type { TechnologyDefinition } from '../../types';

export const practoTechnologyDefinition = {
	id: "practo",
	name: "Practo",
	website: "https://www.practo.com",
	description: "Practo is an appointment system designed for health practitioners to manage and schedule patient appointments.",
	icon: "Practo.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "practo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.practo\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
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
