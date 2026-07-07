import type { TechnologyDefinition } from '../../types';

export const causalfunnelTechnologyDefinition = {
	id: "causalfunnel",
	name: "CausalFunnel",
	website: "https://www.causalfunnel.com",
	description: "CausalFunnel is an AI platform that analyzes customer behavior to optimize business conversion rates.",
	icon: "CuasalFunnel.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "causalfunnel:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.scripts\\.causalfunnel\\.com"),
			description: "Script source URL matches a known technology marker.",
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
