import type { TechnologyDefinition } from '../../types';

export const ecomzTechnologyDefinition = {
	id: "ecomz",
	name: "Ecomz",
	website: "https://www.ecomz.com",
	description: "Ecomz is a platform designed to create, manage, and grow online businesses through integrated ecommerce tools.",
	icon: "Ecomz.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ecomz:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.myecomz\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ecomz:header:1",
			kind: "header",
			key: "Access-Control-Allow-Headers",
			valuePattern: new RegExp("ecomz_client_id", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "ecomz:header:2",
			kind: "header",
			key: "access-control-allow-headers",
			valuePattern: new RegExp("ecomz_client_id", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
