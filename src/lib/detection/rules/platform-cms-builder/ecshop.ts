import type { TechnologyDefinition } from '../../types';

export const ecshopTechnologyDefinition = {
	id: "ecshop",
	name: "eCShop",
	website: "https://www.ecshop.com.br",
	description: "eCShop is a Brazilian ecommerce platform designed for building and managing online shops.",
	icon: "eCShop.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ecshop:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.ecshop\\.com\\.br"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ecshop:header:1",
			kind: "header",
			key: "Powered",
			valuePattern: new RegExp("^eCShop$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "ecshop:header:2",
			kind: "header",
			key: "powered",
			valuePattern: new RegExp("^ecshop$", "i"),
			description: "Response header matches a known technology marker.",
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
