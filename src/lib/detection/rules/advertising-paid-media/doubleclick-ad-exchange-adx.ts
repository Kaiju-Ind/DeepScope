import type { TechnologyDefinition } from '../../types';

export const doubleclickAdExchangeAdxTechnologyDefinition = {
	id: "doubleclick-ad-exchange-adx",
	name: "DoubleClick Ad Exchange (AdX)",
	website: "https://www.doubleclickbygoogle.com/solutions/digital-marketing/ad-exchange/",
	description: "DoubleClick Ad Exchange is a real-time marketplace to buy and sell display advertising space.",
	icon: "DoubleClick.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "doubleclick-ad-exchange-adx:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("googlesyndication\\.com\\/pagead\\/show_ads\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "doubleclick-ad-exchange-adx:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("tpc\\.googlesyndication\\.com\\/safeframe"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "doubleclick-ad-exchange-adx:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("googlesyndication\\.com.*abg\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
