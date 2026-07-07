import type { TechnologyDefinition } from '../../types';

export const chronopostTechnologyDefinition = {
	id: "chronopost",
	name: "Chronopost",
	website: "https://www.chronopost.fr",
	description: "Chronopost provides a domestic and international express shipping and delivery service.",
	icon: "Chronopost.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "chronopost:text:0",
			kind: "text",
			pattern: new RegExp("\\bChronopost\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
