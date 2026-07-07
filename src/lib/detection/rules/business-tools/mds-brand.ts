import type { TechnologyDefinition } from '../../types';

export const mdsBrandTechnologyDefinition = {
	id: "mds-brand",
	name: "MDS Brand",
	website: "https://mdsbrand.com",
	description: "MDS Brand is a provider of website, CRM, vrtual BDC, SEO, PPC, and live chat solutions for Marine, RV, Powersports, and automotive industries.",
	icon: "MDS Brand.png",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "mds-brand:dom:0",
			kind: "dom",
			selector: "a[href*='mdsbrand.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
	requires: [
		"nginx",
		"userway",
	],
} as const satisfies TechnologyDefinition;
