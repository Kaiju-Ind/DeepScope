import type { TechnologyDefinition } from '../../types';

export const paidyTechnologyDefinition = {
	id: "paidy",
	name: "Paidy",
	website: "https://paidy.com",
	description: "Paidy is basically a two-sided payments service, acting as a middleman between consumers and merchants in Japan.",
	icon: "Paidy.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "paidy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("apps\\.paidy\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "paidy:jsGlobal:1",
			kind: "jsGlobal",
			property: "Constants.paidy",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
