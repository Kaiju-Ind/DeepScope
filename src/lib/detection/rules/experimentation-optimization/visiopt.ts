import type { TechnologyDefinition } from '../../types';

export const visioptTechnologyDefinition = {
	id: "visiopt",
	name: "VisiOpt",
	website: "https://visiopt.com",
	description: "Visiopt™ is a powerful yet easy to use AI-driven Optimization System that enables you to manufacture your perfect customer at scale like a well oiled machine.",
	icon: "visiopt.png",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "visiopt:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("visiopt\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "visiopt:jsGlobal:1",
			kind: "jsGlobal",
			property: "visiopt_code",
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
