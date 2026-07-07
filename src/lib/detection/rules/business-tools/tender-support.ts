import type { TechnologyDefinition } from '../../types';

export const tenderSupportTechnologyDefinition = {
	id: "tender-support",
	name: "Tender Support",
	website: "https://tenderapp.com",
	description: "Tender Support is a customer service software offering essential tools to enhance customer support.",
	icon: "TenderSupport.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "tender-support:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.tenderapp\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tender-support:jsGlobal:1",
			kind: "jsGlobal",
			property: "Tender",
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
