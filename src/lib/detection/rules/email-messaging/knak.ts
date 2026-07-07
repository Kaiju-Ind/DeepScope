import type { TechnologyDefinition } from '../../types';

export const knakTechnologyDefinition = {
	id: "knak",
	name: "Knak",
	website: "https://knak.com",
	description: "Knak is a platform that provides customisable email and landing page templates to simplify the creation of visually appealing marketing campaigns.",
	icon: "Knak.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "knak:dom:0",
			kind: "dom",
			selector: "img[src*='.knak.io/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
