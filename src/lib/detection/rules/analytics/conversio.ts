import type { TechnologyDefinition } from '../../types';

export const conversioTechnologyDefinition = {
	id: "conversio",
	name: "Conversio",
	website: "https://conversio.com",
	description: "Conversio is an optimisation and analytics agency.",
	icon: "Conversio.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "conversio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.conversio\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "conversio:jsGlobal:1",
			kind: "jsGlobal",
			property: "Conversio.settings",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
