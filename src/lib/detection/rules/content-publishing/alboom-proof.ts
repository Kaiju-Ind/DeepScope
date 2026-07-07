import type { TechnologyDefinition } from '../../types';

export const alboomProofTechnologyDefinition = {
	id: "alboom-proof",
	name: "Alboom Proof",
	website: "https://www.alboompro.com/ferramentas/alboom-proof",
	description: "Alboom Proof is a platform that provides client photo galleries, photo sales, and proofing services in one location, enabling photographers and visual artists to deliver their work.",
	icon: "Alboom.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "alboom-proof:dom:0",
			kind: "dom",
			selector: "img[data-original*='alfred.alboompro.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
