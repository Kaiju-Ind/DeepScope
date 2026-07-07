import type { TechnologyDefinition } from '../../types';

export const paypalMarketingSolutionsTechnologyDefinition = {
	id: "paypal-marketing-solutions",
	name: "PayPal Marketing Solutions",
	website: "https://developer.paypal.com/docs/marketing-solutions",
	description: "PayPal Marketing Solutions enables merchants to see shopper insights and provide custom rewards for buyers with PayPal accounts.",
	icon: "PayPal.svg",
	categories: [
		"analytics",
		"marketing-automation",
	],
	rules: [
		{
			id: "paypal-marketing-solutions:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.paypalobjects\\.com\\/muse\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "paypal-marketing-solutions:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.paypal\\.com\\/tagmanager\\/pptm\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
	implies: [
		"paypal",
	],
} as const satisfies TechnologyDefinition;
