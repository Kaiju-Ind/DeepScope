import type { TechnologyDefinition } from '../../types';

export const coconTechnologyDefinition = {
	id: "cocon",
	name: "COCON",
	website: "https://www.cocon.app",
	description: "COCON is an email marketing strategy designed to enhance the performance of a Shopify store.",
	icon: "COCON.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "cocon:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.cocon\\.app"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
