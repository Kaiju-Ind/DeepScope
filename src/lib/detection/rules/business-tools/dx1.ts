import type { TechnologyDefinition } from '../../types';

export const dx1TechnologyDefinition = {
	id: "dx1",
	name: "DX1",
	website: "https://www.dx1app.com",
	description: "DX1 is an entirely cloud-based dealership management system for the motorcycle and powersports industry. Offering DMS, website, CRM and marketing tools.",
	icon: "DX1.png",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "dx1:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.dx1app\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "dx1:jsGlobal:1",
			kind: "jsGlobal",
			property: "Dx1.Dnn",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
	requires: [
		"dnn",
	],
} as const satisfies TechnologyDefinition;
