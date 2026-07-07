import type { TechnologyDefinition } from '../../types';

export const zoodpayTechnologyDefinition = {
	id: "zoodpay",
	name: "ZoodPay",
	website: "https://www.zoodpay.com",
	description: "ZoodPay is a financial technology company that provides payment and financing solutions, including buy-now-pay-later (BNPL) services and point-of-sale financing, to facilitate transactions for consumers and businesses.",
	icon: "ZoodPay.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "zoodpay:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("wp-content\\/plugins\\/zoodpay\\/(?:.+\\?ver=([\\d\\.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "zoodpay:dom:1",
			kind: "dom",
			selector: "img[src*='zoodpay']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
