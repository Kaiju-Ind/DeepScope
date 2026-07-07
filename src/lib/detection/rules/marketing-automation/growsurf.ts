import type { TechnologyDefinition } from '../../types';

export const growsurfTechnologyDefinition = {
	id: "growsurf",
	name: "GrowSurf",
	website: "https://growsurf.com",
	description: "GrowSurf is a referral marketing software designed to automate viral growth for websites.",
	icon: "GrowSurf.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "growsurf:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.growsurf\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "growsurf:jsGlobal:1",
			kind: "jsGlobal",
			property: "growsurf.init",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
