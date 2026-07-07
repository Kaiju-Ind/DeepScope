import type { TechnologyDefinition } from '../../types';

export const celeritasTechnologyDefinition = {
	id: "celeritas",
	name: "Celeritas",
	website: "https://celeritastransporte.com",
	description: "Celeritas offers transportation logistics services for package deliveries.",
	icon: "Celeritas.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "celeritas:text:0",
			kind: "text",
			pattern: new RegExp("\\bCeleritas\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
