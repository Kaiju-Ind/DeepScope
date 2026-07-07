import type { TechnologyDefinition } from '../../types';

export const maestrusTechnologyDefinition = {
	id: "maestrus",
	name: "Maestrus",
	website: "https://maestrus.com",
	description: "Maestrus is a complete EAD platform that enables course sales, employee training, and secure content delivery with personalization.",
	icon: "Maestrus.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "maestrus:dom:0",
			kind: "dom",
			selector: "div#maestrus-carousel > div#myMaestrus-carousel",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
