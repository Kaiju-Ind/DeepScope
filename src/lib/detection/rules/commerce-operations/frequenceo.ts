import type { TechnologyDefinition } from '../../types';

export const frequenceoTechnologyDefinition = {
	id: "frequenceo",
	name: "Frequenceo",
	website: "https://www.laposte.fr/entreprise/produit-entreprise/frequenceo",
	description: "Frequenceo is a fixed-rate postage service in France.",
	icon: "La Poste.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "frequenceo:text:0",
			kind: "text",
			pattern: new RegExp("\\bFrequenceo\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
