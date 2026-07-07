import type { TechnologyDefinition } from '../../types';

export const delivengoTechnologyDefinition = {
	id: "delivengo",
	name: "Delivengo",
	website: "https://mydelivengo.laposte.fr/",
	description: "Delivengo is an international shipping service powered by La Poste.",
	icon: "La Poste.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "delivengo:text:0",
			kind: "text",
			pattern: new RegExp("\\bDelivengo\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
