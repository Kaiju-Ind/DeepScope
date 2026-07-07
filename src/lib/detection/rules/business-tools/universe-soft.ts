import type { TechnologyDefinition } from '../../types';

export const universeSoftTechnologyDefinition = {
	id: "universe-soft",
	name: "Universe Soft",
	website: "https://universe-soft.ru",
	description: "Universe-Soft is a business automation platform for salons, clinics, and fitness centers in Russia.",
	icon: "UniverseSoft.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "universe-soft:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.universe-soft\\.ru\\/"),
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
