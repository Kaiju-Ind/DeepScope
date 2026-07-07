import type { TechnologyDefinition } from '../../types';

export const quicqTechnologyDefinition = {
	id: "quicq",
	name: "Quicq",
	website: "https://afosto.com/apps/quicq",
	description: "Quicq is an image optimisation tool by Afosto.",
	icon: "Quicq.svg",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "quicq:dom:0",
			kind: "dom",
			selector: "img[src*='.qcqcdn.com/'], img[data-src*='.qcqcdn.com/'], img[src*='cdn.quicq.io/'], img[data-src*='cdn.quicq.io/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
