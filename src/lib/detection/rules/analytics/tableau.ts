import type { TechnologyDefinition } from '../../types';

export const tableauTechnologyDefinition = {
	id: "tableau",
	name: "Tableau",
	website: "https://www.tableau.com",
	description: "Tableau is a data visualization tool that enables creation of interactive visualizations for embedding in websites or sharing with others.",
	icon: "Tableau.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "tableau:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("public\\.tableau\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tableau:jsGlobal:1",
			kind: "jsGlobal",
			property: "tableau.CategoricalFilter",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "tableau:jsGlobal:2",
			kind: "jsGlobal",
			property: "tableauSoftware.CategoricalFilter",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
