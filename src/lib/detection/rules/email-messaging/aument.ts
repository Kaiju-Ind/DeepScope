import type { TechnologyDefinition } from '../../types';

export const aumentTechnologyDefinition = {
	id: "aument",
	name: "Aument",
	website: "https://aument.io",
	description: "Aument is an ecommerce toolbox with easy to use marketing actions and workflows.",
	icon: "Aument.svg",
	categories: [
		"email-messaging",
		"commerce-operations",
	],
	rules: [
		{
			id: "aument:dom:0",
			kind: "dom",
			selector: "div#aumentDiscountCode",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "aument:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("aumentstaticfiles\\.s3\\.amazonaws\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "aument:dom:2",
			kind: "dom",
			selector: "div#aumentDiscountCode, link[href*='aumentstaticfiles.s3.amazonaws.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
