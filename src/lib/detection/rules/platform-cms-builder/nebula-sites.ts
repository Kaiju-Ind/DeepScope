import type { TechnologyDefinition } from '../../types';

export const nebulaSitesTechnologyDefinition = {
	id: "nebula-sites",
	name: "Nebula Sites",
	website: "https://nebulasites.org",
	description: "Nebula Sites is a platform that allows users to create, host, and manage websites.",
	icon: "NebulaSites.svg",
	categories: [
		"platform-cms-builder",
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "nebula-sites:dom:0",
			kind: "dom",
			selector: "link[ns^='Nebula Sites']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
