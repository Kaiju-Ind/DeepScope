import type { TechnologyDefinition } from '../../types';

export const analyticowlTechnologyDefinition = {
	id: "analyticowl",
	name: "AnalyticOwl",
	website: "https://analyticowl.com",
	description: "AnalyticOwl is a platform that offers a planning and attribution toolbox designed to support more informed advertising decisions.",
	icon: "AnalyticOwl.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "analyticowl:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("owlsight\\.analyticowl\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
