import type { TechnologyDefinition } from '../../types';

export const sellwildTechnologyDefinition = {
	id: "sellwild",
	name: "Sellwild",
	website: "https://sellwild.com",
	description: "Sellwild is a marketplace platform designed to connect buyers and sellers.",
	icon: "Sellwild.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sellwild:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.sellwild\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
