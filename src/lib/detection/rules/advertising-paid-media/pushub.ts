import type { TechnologyDefinition } from '../../types';

export const pushubTechnologyDefinition = {
	id: "pushub",
	name: "Pushub",
	website: "https://pushub.net",
	description: "Pushub is a self-serve demand side platform (DSP) designed for affiliates and agencies.",
	icon: "Pushub.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "pushub:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.pushub\\.net\\/"),
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
