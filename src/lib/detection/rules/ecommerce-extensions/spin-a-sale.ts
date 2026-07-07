import type { TechnologyDefinition } from '../../types';

export const spinASaleTechnologyDefinition = {
	id: "spin-a-sale",
	name: "Spin-a-Sale",
	website: "https://spinasale.com",
	description: "Spin-a-Sale adds the intensity of gamification to your site. Spin-a-Sale overlay displays a special prize wheel for visitors that you can fully configure.",
	icon: "Spin-a-Sale.png",
	categories: [
		"ecommerce-extensions",
		"widgets-misc",
	],
	rules: [
		{
			id: "spin-a-sale:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("client\\.spinasale\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
