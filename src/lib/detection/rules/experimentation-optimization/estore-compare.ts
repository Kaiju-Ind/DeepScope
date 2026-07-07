import type { TechnologyDefinition } from '../../types';

export const estoreCompareTechnologyDefinition = {
	id: "estore-compare",
	name: "Estore Compare",
	website: "https://estore.co.jp/estorecompare/",
	description: "Estore Compare is a website optimisation software that offers A/B testing, CVR and LTV measuring tools.",
	icon: "EstoreCompare.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "estore-compare:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\d+\\.estore\\.jp\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
