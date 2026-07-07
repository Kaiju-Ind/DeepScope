import type { TechnologyDefinition } from '../../types';

export const tradingviewTechnologyDefinition = {
	id: "tradingview",
	name: "TradingView",
	website: "https://www.tradingview.com",
	description: "TradingView is used to show world chart, chats and trades markets.",
	icon: "trading_view.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "tradingview:dom:0",
			kind: "dom",
			selector: "iframe[src*='.tradingview.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
