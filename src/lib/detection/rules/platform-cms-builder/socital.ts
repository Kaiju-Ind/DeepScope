import type { TechnologyDefinition } from '../../types';

export const socitalTechnologyDefinition = {
	id: "socital",
	name: "Socital",
	website: "https://socital.com",
	description: "Socital is an on-site campaign toolkit designed for ecommerce platforms.",
	icon: "Socital.svg",
	categories: [
		"platform-cms-builder",
		"marketing-automation",
	],
	rules: [
		{
			id: "socital:dom:0",
			kind: "dom",
			selector: "script#socital-script",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "socital:jsGlobal:1",
			kind: "jsGlobal",
			property: "socital",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
