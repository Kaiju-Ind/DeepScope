import type { TechnologyDefinition } from '../../types';

export const posteItalianeTechnologyDefinition = {
	id: "poste-italiane",
	name: "Poste Italiane",
	website: "https://www.poste.it",
	description: "Poste Italiane is the Italian postal service provider.",
	icon: "Poste Italiane.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "poste-italiane:text:0",
			kind: "text",
			pattern: new RegExp("\\bPoste Italiane\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
