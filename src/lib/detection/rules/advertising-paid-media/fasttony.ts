import type { TechnologyDefinition } from '../../types';

export const fasttonyTechnologyDefinition = {
	id: "fasttony",
	name: "FastTony",
	website: "https://fasttony.com",
	description: "FastTony is an application that facilitates promotion and sales through Facebook and Instagram.",
	icon: "FastTony.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "fasttony:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.fasttony\\.(?:es|com)\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
