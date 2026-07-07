import type { TechnologyDefinition } from '../../types';

export const covetPicsTechnologyDefinition = {
	id: "covet-pics",
	name: "Covet.pics",
	website: "https://covet.pics",
	description: "Covet.pics is a customizable Shopify app for Instagram and Lookbook shoppable galleries.",
	icon: "Covet.pics.svg",
	categories: [
		"marketing-automation",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "covet-pics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.covet\\.pics\\/"),
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
