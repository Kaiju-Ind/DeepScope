import type { TechnologyDefinition } from '../../types';

export const synupTechnologyDefinition = {
	id: "synup",
	name: "Synup",
	website: "https://www.synup.com",
	description: "Synup is a platform that provides online business listings management, monitors reputation, and offers local search analytics.",
	icon: "Synup.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "synup:dom:0",
			kind: "dom",
			selector: "iframe[src*='.synup.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
