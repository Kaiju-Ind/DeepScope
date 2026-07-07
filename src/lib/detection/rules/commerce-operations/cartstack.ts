import type { TechnologyDefinition } from '../../types';

export const cartstackTechnologyDefinition = {
	id: "cartstack",
	name: "CartStack",
	website: "https://www.cartstack.com",
	description: "CartStack is a SaaS solution that allows any company with an ecommerce site or reservation system to increase revenue through reminding/encouraging consumers to return to their abandoned cart and complete their purchase.",
	icon: "CartStack.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "cartstack:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.cartstack\\.\\w+"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cartstack:jsGlobal:1",
			kind: "jsGlobal",
			property: "_cartstack",
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
