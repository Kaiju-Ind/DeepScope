import type { TechnologyDefinition } from '../../types';

export const basisTechnologiesTechnologyDefinition = {
	id: "basis-technologies",
	name: "Basis Technologies",
	website: "https://basis.net/",
	description: "Basis Technologies, formerly ‘Centro,’ provides cloud-based workflow automation and business intelligence software for marketing.",
	icon: "Basis.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "basis-technologies:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn01\\.basis\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
