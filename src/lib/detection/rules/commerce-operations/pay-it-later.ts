import type { TechnologyDefinition } from '../../types';

export const payItLaterTechnologyDefinition = {
	id: "pay-it-later",
	name: "Pay It Later",
	website: "https://www.payitlater.com.au",
	description: "Pay It Later collect payments in weekly instalments from you when you make a purchase online, so you can buy now and pay it later.",
	icon: "Pay It Later.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "pay-it-later:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/payitlater-gateway-for-woocommerce\\/(?:.+\\?ver=([\\d\\.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pay-it-later:dom:1",
			kind: "dom",
			selector: "a[href*='.payitlater.com.au'][target='_blank'], img[src*='PayItLater'][alt='PayItLater']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "pay-it-later:jsGlobal:2",
			kind: "jsGlobal",
			property: "payitlater",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
