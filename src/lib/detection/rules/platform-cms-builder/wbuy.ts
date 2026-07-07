import type { TechnologyDefinition } from '../../types';

export const wbuyTechnologyDefinition = {
	id: "wbuy",
	name: "wBuy",
	website: "https://www.wbuy.com.br",
	description: "wBuy is a SaaS ecommerce platform.",
	icon: "wBuy.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "wbuy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.sistemawbuy\\.com\\.br\\/"),
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
