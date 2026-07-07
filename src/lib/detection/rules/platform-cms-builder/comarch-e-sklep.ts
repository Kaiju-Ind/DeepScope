import type { TechnologyDefinition } from '../../types';

export const comarchESklepTechnologyDefinition = {
	id: "comarch-e-sklep",
	name: "Comarch e-Sklep",
	website: "https://www.comarchesklep.pl",
	description: "Comarch e-Sklep is an ecommerce platform for creating and managing an online store.",
	icon: "ComarcheSklep.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "comarch-e-sklep:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.comarchesklep\\.pl"),
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
