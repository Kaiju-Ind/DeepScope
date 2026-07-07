import type { TechnologyDefinition } from '../../types';

export const monsidoTechnologyDefinition = {
	id: "monsido",
	name: "Monsido",
	website: "https://monsido.com",
	description: "Monsido provides a website management platform that automates processes, ensures regulatory compliance, improves collaboration in web and marketing teams, and streamlines reporting.",
	icon: "Monsido.png",
	categories: [
		"analytics",
		"privacy-compliance",
		"accessibility",
	],
	rules: [
		{
			id: "monsido:jsGlobal:0",
			kind: "jsGlobal",
			property: "_monsido",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "monsido:jsGlobal:1",
			kind: "jsGlobal",
			property: "monsido_tracking",
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
