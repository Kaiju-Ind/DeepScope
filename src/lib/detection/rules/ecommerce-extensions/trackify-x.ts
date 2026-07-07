import type { TechnologyDefinition } from '../../types';

export const trackifyXTechnologyDefinition = {
	id: "trackify-x",
	name: "Trackify X",
	website: "https://trackifyapp.com",
	description: "Trackify X is a pixel engine that helps merchants backup their pixel data and manage multiple pixels.",
	icon: "Trackify X.png",
	categories: [
		"ecommerce-extensions",
		"analytics",
	],
	rules: [
		{
			id: "trackify-x:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("trackifyx\\.redretarget\\.com\\/"),
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
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
