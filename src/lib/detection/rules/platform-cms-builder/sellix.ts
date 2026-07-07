import type { TechnologyDefinition } from '../../types';

export const sellixTechnologyDefinition = {
	id: "sellix",
	name: "Sellix",
	website: "https://sellix.io/",
	description: "Sellix is an ecommerce payment processor. It accepts PayPal, PerfectMoney and popular cryptocurrencies.",
	icon: "Sellix.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sellix:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.sellix\\.io\\/static\\/js\\/embed\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sellix:dom:1",
			kind: "dom",
			selector: "link[href*='.sellix.io']",
			description: "DOM selector matches a known technology marker.",
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
} as const satisfies TechnologyDefinition;
