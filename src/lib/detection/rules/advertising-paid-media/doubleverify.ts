import type { TechnologyDefinition } from '../../types';

export const doubleverifyTechnologyDefinition = {
	id: "doubleverify",
	name: "DoubleVerify",
	website: "https://doubleverify.com",
	description: "DoubleVerify is a software platform for digital media measurement, data, and analytics.",
	icon: "DoubleVerify.svg",
	categories: [
		"advertising-paid-media",
		"analytics",
	],
	rules: [
		{
			id: "doubleverify:dom:0",
			kind: "dom",
			selector: "link[href*='.doubleverify.com']",
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
