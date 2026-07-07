import type { TechnologyDefinition } from '../../types';

export const correosTechnologyDefinition = {
	id: "correos",
	name: "Correos",
	website: "https://www.correos.es",
	description: "Correos is a state-owned company responsible for providing postal service in Spain.",
	icon: "Correos.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "correos:text:0",
			kind: "text",
			pattern: new RegExp("\\bCorreos\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
