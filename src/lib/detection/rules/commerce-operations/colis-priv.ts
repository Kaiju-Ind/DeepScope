import type { TechnologyDefinition } from '../../types';

export const colisPrivTechnologyDefinition = {
	id: "colis-priv",
	name: "Colis Privé",
	website: "https://www.colisprive.fr",
	description: "Colis Privé is a private parcel delivery service provider specialised in last-mile delivery.",
	icon: "Colis Prive.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "colis-priv:text:0",
			kind: "text",
			pattern: new RegExp("\\bColis Priv[eé]\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
