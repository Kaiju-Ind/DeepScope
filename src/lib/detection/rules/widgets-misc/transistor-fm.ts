import type { TechnologyDefinition } from '../../types';

export const transistorFmTechnologyDefinition = {
	id: "transistor-fm",
	name: "Transistor.fm",
	website: "https://transistor.fm",
	description: "Transistor.fm is a podcast host, distribution and management platform.",
	icon: "Transistor.fm.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "transistor-fm:dom:0",
			kind: "dom",
			selector: "iframe[src*='.transistor.fm/']",
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
