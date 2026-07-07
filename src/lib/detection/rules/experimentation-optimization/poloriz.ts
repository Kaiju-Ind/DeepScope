import type { TechnologyDefinition } from '../../types';

export const polorizTechnologyDefinition = {
	id: "poloriz",
	name: "Poloriz",
	website: "https://www.poloriz.com",
	description: "Poloriz's technology automatically creates a personalised, full-screen, mobile-first, cross-selling user experience for shoppers.",
	icon: "Poloriz.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "poloriz:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.poloriz\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
