import type { TechnologyDefinition } from '../../types';

export const hikariCsTechnologyDefinition = {
	id: "hikari-cs",
	name: "Hikari CS",
	website: "https://www.hikarics.com",
	description: "Hicari CS is a solution that helps webshops increase sales and customer loyalty with excellent customer service.",
	icon: "HikariCS.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "hikari-cs:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.hikarics\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
