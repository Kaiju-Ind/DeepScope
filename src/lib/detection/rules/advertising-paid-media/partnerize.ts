import type { TechnologyDefinition } from '../../types';

export const partnerizeTechnologyDefinition = {
	id: "partnerize",
	name: "Partnerize",
	website: "https://prf.hn",
	description: "Partnerize is the only partnership management solution for marketers seeking high quality, scalable subsidies to primary channels.",
	icon: "Partnerize.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "partnerize:dom:0",
			kind: "dom",
			selector: "a[href*='prf.hn/click'], img[src*='.prf.hn/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
