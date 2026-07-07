import type { TechnologyDefinition } from '../../types';

export const forethoughtSolveTechnologyDefinition = {
	id: "forethought-solve",
	name: "Forethought Solve",
	website: "https://forethought.ai/platform/solve/",
	description: "Forethought Solve is a live-chat widget that uses generative AI to automate responses for common questions across all channels.",
	icon: "Forethought Solve.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "forethought-solve:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("solve-widget\\.forethought\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
