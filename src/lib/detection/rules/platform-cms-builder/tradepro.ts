import type { TechnologyDefinition } from '../../types';

export const tradeproTechnologyDefinition = {
	id: "tradepro",
	name: "TradePro",
	website: "https://www.itb-pim.com/software-products/tradepro",
	description: "TradePro is a B2B ecommerce platform that enables businesses to connect, manage transactions, and streamline trade activities in a digital environment.",
	icon: "TradePro.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "tradepro:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:https?:\\/\\/[^\"']+)?\\/tradepro\\/shop\\/appserv\\/.*"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tradepro:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^sessiontradepro$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
