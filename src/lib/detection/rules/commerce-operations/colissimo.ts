import type { TechnologyDefinition } from '../../types';

export const colissimoTechnologyDefinition = {
	id: "colissimo",
	name: "Colissimo",
	website: "https://www.colissimo.entreprise.laposte.fr",
	description: "Colissimo is a 'drop off' parcel delivery service.",
	icon: "DPD.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "colissimo:text:0",
			kind: "text",
			pattern: new RegExp("\\bColissimo\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
