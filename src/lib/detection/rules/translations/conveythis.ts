import type { TechnologyDefinition } from '../../types';

export const conveythisTechnologyDefinition = {
	id: "conveythis",
	name: "ConveyThis",
	website: "https://www.conveythis.com/",
	description: "ConveyThis is a website translation service.",
	icon: "ConveyThis.png",
	categories: [
		"translations",
	],
	rules: [
		{
			id: "conveythis:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.conveythis\\.com"),
			description: "Script source URL matches a known technology marker.",
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
