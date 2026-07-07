import type { TechnologyDefinition } from '../../types';

export const thgIngenuityTechnologyDefinition = {
	id: "thg-ingenuity",
	name: "THG Ingenuity",
	website: "https://www.thgingenuity.com",
	description: "THG Ingenuity is completely unique in that it's both a peer-to-peer ecommerce retailer and a service provider to global cross-border commerce operations.",
	icon: "THG Ingenuity.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "thg-ingenuity:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("THEHUT-.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "thg-ingenuity:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("thehut-.*\\.js"),
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
