import type { TechnologyDefinition } from '../../types';

export const dotgoTechnologyDefinition = {
	id: "dotgo",
	name: "DotGo",
	website: "https://www.dotgo.uk",
	description: "DotGo is an UK-based business website builder that provides a platform for creating and managing websites.",
	icon: "DotGo.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "dotgo:dom:0",
			kind: "dom",
			selector: "source[src*='www.dotgo.uk/']",
			description: "DOM selector matches a known technology marker.",
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
