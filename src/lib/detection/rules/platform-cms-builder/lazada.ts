import type { TechnologyDefinition } from '../../types';

export const lazadaTechnologyDefinition = {
	id: "lazada",
	name: "Lazada",
	website: "https://www.lazada.com",
	description: "Lazada is a B2B2C marketplace model in which so-called merchants sell goods on their platform.",
	icon: "Lazada.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "lazada:meta:0",
			kind: "meta",
			key: "aplus-auto-exp",
			valuePattern: new RegExp("lzdhome\\.desktop\\.", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
