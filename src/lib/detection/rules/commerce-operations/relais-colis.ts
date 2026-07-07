import type { TechnologyDefinition } from '../../types';

export const relaisColisTechnologyDefinition = {
	id: "relais-colis",
	name: "Relais Colis",
	website: "https://www.relaiscolis.com",
	description: "Relais Colis is a French parcel delivery network.",
	icon: "Relais Colis.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "relais-colis:text:0",
			kind: "text",
			pattern: new RegExp("\\bRelais Colis\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
