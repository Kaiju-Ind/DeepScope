import type { TechnologyDefinition } from '../../types';

export const salesmanagoTechnologyDefinition = {
	id: "salesmanago",
	name: "SALESmanago",
	website: "https://www.salesmanago.com",
	description: "SALESmanago is a no-code marketing automation and customer data platform designed for mid-sized buinesses and enterprises.",
	icon: "SALESmanago.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "salesmanago:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.salesmanago\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "salesmanago:jsGlobal:1",
			kind: "jsGlobal",
			property: "SalesmanagoObject",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
