import type { TechnologyDefinition } from '../../types';

export const groupbyTechnologyDefinition = {
	id: "groupby",
	name: "GroupBy",
	website: "https://groupbyinc.com/",
	description: "GroupBy is a search enging for eCommerce sites.",
	icon: "Groupby.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "groupby:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.groupbycloud\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
