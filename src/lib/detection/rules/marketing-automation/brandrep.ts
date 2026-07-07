import type { TechnologyDefinition } from '../../types';

export const brandrepTechnologyDefinition = {
	id: "brandrep",
	name: "BrandRep",
	website: "https://www.brandrep.com",
	description: "BrandRep is a local internet marketing solution that supports website online presence, search visibility, and customer engagement across digital channels.",
	icon: "BrandRep.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "brandrep:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.brandrep\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
