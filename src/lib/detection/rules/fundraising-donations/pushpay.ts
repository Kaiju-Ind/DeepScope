import type { TechnologyDefinition } from '../../types';

export const pushpayTechnologyDefinition = {
	id: "pushpay",
	name: "Pushpay",
	website: "https://pushpay.com",
	description: "Pushpay is a digital giving and engagement platform designed to help churches manage processes related to donations and fundraising.",
	icon: "Pushpay.svg",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "pushpay:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/pushpay\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pushpay:dom:1",
			kind: "dom",
			selector: "a[href*='//ppay.co/'][target='_blank']",
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
