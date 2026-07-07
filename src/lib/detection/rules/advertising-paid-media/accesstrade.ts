import type { TechnologyDefinition } from '../../types';

export const accesstradeTechnologyDefinition = {
	id: "accesstrade",
	name: "AccessTrade",
	website: "https://accesstrade.global/",
	description: "AccessTrade is an affiliate marketing platform based on the CPA model developed by Interspace Co.",
	icon: "AccessTrade.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "accesstrade:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("accesstrade\\.net\\/js\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "accesstrade:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("click\\.accesstra\\.de\\/js\\/nct\\/lp\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "accesstrade:dom:2",
			kind: "dom",
			selector: "img[src*='.accesstrade.net'],img[data-src*='.accesstrade.net']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
