import type { TechnologyDefinition } from '../../types';

export const pictureItTechnologyDefinition = {
	id: "picture-it",
	name: "Picture It",
	website: "https://www.pictureit.co",
	description: "Picture It is a preview tool designed for Shopify art stores, enabling visualization of products within a single platform.",
	icon: "PictureIt.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "picture-it:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.pictureit\\.co\\/"),
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
