import type { TechnologyDefinition } from '../../types';

export const revjetTechnologyDefinition = {
	id: "revjet",
	name: "RevJet",
	website: "https://www.revjet.com",
	description: "RevJet is the first comprehensive Ad Experience Platform, for every audience, channel, format, inventory, and device.",
	icon: "RevJet.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "revjet:dom:0",
			kind: "dom",
			selector: "link[href*='.revjet.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
