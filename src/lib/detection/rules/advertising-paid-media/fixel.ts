import type { TechnologyDefinition } from '../../types';

export const fixelTechnologyDefinition = {
	id: "fixel",
	name: "Fixel",
	website: "https://fixel.ai",
	description: "Fixel is a remarketing and segmentation campaign builder utilising AI technology.",
	icon: "Fixel.svg",
	categories: [
		"advertising-paid-media",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "fixel:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("script\\.fixel\\.ai\\/"),
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
