import type { TechnologyDefinition } from '../../types';

export const elromcoTechnologyDefinition = {
	id: "elromco",
	name: "Elromco",
	website: "https://www.elromco.com",
	description: "Elromco is a software platform that provides moving companies with a CRM and management solution.",
	icon: "Elromco.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "elromco:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("embed\\.elromco\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "elromco:jsGlobal:1",
			kind: "jsGlobal",
			property: "ElromcoAPI",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
