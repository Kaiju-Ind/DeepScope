import type { TechnologyDefinition } from '../../types';

export const rakuUruCartTechnologyDefinition = {
	id: "raku-uru-cart",
	name: "Raku-uru Cart",
	website: "https://business.kuronekoyamato.co.jp/raku-uru/",
	description: "Raku-uru Cart is an all-in-one ecommerce platform from Japan.",
	icon: "Raku-uru Cart.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "raku-uru-cart:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.raku-uru\\.jp\\/cms"),
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
} as const satisfies TechnologyDefinition;
