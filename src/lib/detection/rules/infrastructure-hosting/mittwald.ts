import type { TechnologyDefinition } from '../../types';

export const mittwaldTechnologyDefinition = {
	id: "mittwald",
	name: "Mittwald",
	website: "https://www.mittwald.de",
	description: "Mittwald is a web hosting agency, established in 2003 in Espelkamp, Germany.",
	icon: "Mittwald.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "mittwald:dns:0",
			kind: "dns",
			valuePattern: new RegExp("ns\\d+\\.agenturserver\\.(?:de|co|it)", "i"),
			recordType: "SOA",
			description: "DNS record matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
