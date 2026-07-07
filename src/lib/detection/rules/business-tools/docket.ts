import type { TechnologyDefinition } from '../../types';

export const docketTechnologyDefinition = {
	id: "docket",
	name: "Docket",
	website: "https://www.yourdocket.com",
	description: "Docket is a waste management and dumpster rental software, helping businesses manage assets, invoices, accounting, and communication.",
	icon: "Docket.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "docket:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("dockethosting\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "docket:jsGlobal:1",
			kind: "jsGlobal",
			property: "DocketPay",
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
