import type { TechnologyDefinition } from '../../types';

export const astuteSolutionsTechnologyDefinition = {
	id: "astute-solutions",
	name: "Astute Solutions",
	website: "https://astutesolutions.com",
	description: "Astute Solutions is a customer engagement software.",
	icon: "Astute Solutions.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "astute-solutions:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.iperceptions\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "astute-solutions:dom:1",
			kind: "dom",
			selector: "iframe[src*='.iperceptions.com'], link[href*='.iperceptions.com']",
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
