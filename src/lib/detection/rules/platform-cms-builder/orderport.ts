import type { TechnologyDefinition } from '../../types';

export const orderportTechnologyDefinition = {
	id: "orderport",
	name: "OrderPort",
	website: "https://orderport.net",
	description: "OrderPort is an eсommerce platform tailored for wineries, offering online sales, wine clubs, and point-of-sale integration.",
	icon: "OrderPort.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "orderport:dom:0",
			kind: "dom",
			selector: "span#updViewCart a[href*='orderport.net']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
	requires: [
		"cart-functionality",
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
